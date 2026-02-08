/**
 * 0x3d Hub Admin Dashboard JavaScript
 * Complete CMS functionality for managing all site content
 */

// ========================================
// Global State
// ========================================

let config = { navigation: [], social: {}, branding: {} };
let posts = [];
let currentLang = 'nim';
let currentRes = 'cheatsheets';
let languageData = {};
let resourceData = {};
let editingPostIndex = -1;
let editingSectionIndex = -1;
let editingItemIndex = -1;
let easyMDE = null;

// File System Access API Handle
let dirHandle = null;

// Helper: Parse Markdown Database
function parseMarkdownDB(text) {
    const lines = text.split('\n');
    let data = { title: '', description: '', sections: [] };
    let currentSection = { name: 'General', items: [] };
    let parsingDesc = true;

    lines.forEach(line => {
        line = line.trim();
        if (!line) return;

        if (line.startsWith('# ')) {
            data.title = line.substring(2).trim();
        } else if (line.startsWith('## ')) {
            if (currentSection.items.length > 0) {
                data.sections.push(currentSection);
            }
            currentSection = { name: line.substring(3).trim(), items: [] };
            parsingDesc = false;
        } else if (line.startsWith('- [') || line.startsWith('* [')) {
            const match = line.match(/^[-*]\s+\[(.*?)\]\((.*?)\)(?:\s+-\s+(.*))?/);
            if (match) {
                currentSection.items.push({
                    name: match[1],
                    url: match[2],
                    description: match[3] || ''
                });
            }
            parsingDesc = false;
        } else if (parsingDesc && !line.startsWith('#')) {
            data.description += (data.description ? ' ' : '') + line;
        }
    });

    if (currentSection.items.length > 0) {
        data.sections.push(currentSection);
    }
    return data;
}

// Helper: Convert Object to Markdown
function convertToMarkdown(data) {
    let md = '';
    if (data.title) md += `# ${data.title}\n`;
    if (data.description) md += `${data.description}\n\n`;

    if (data.sections) {
        data.sections.forEach(section => {
            md += `## ${section.name || section.category || 'General'}\n`;
            section.items.forEach(item => {
                md += `- [${item.name || item.label}](${item.url})`;
                if (item.description || item.desc) md += ` - ${item.description || item.desc}`;
                md += '\n';
            });
            md += '\n';
        });
    }
    return md;
}

async function connectLocalFolder() {
    if (!window.showDirectoryPicker) {
        alert('Your browser does not support Direct File Saving (File System Access API).\n\nPlease use Chrome, Edge, or Opera for this feature.\nFirefox and Safari require manual downloads.');
        return;
    }

    try {
        dirHandle = await window.showDirectoryPicker();

        // ==> Verification Step <==
        let isRootFolder = false;
        try {
            await dirHandle.getFileHandle('index.html', { create: false });
            await dirHandle.getDirectoryHandle('content', { create: false });
            await dirHandle.getDirectoryHandle('admin', { create: false });
            isRootFolder = true;
        } catch (e) {
            // This is expected if the file/dir doesn't exist
        }

        if (!isRootFolder) {
            if (!confirm('Warning: This does not look like the project root folder (missing index.html, content/, or admin/).\n\nSaving files might not work as expected.\n\nAre you sure you want to continue?')) {
                dirHandle = null; // Reset the handle
                return;
            }
        }
        // ==> End Verification <==

        // Verify we have write access
        const options = { mode: 'readwrite' };
        if ((await dirHandle.queryPermission(options)) !== 'granted') {
            if ((await dirHandle.requestPermission(options)) !== 'granted') {
                throw new Error('Write permission denied');
            }
        }
        document.getElementById('folder-status').style.backgroundColor = '#00ff9d';
        document.getElementById('folder-name-display').textContent = `Status: Connected (${dirHandle.name})`;
        document.getElementById('connection-label').textContent = 'Change Folder';
        alert('Connected to local folder! Changes will now save directly.');
    } catch (e) {
        document.getElementById('folder-status').style.backgroundColor = '';
        document.getElementById('folder-name-display').textContent = 'Status: Not Connected';
        document.getElementById('connection-label').textContent = 'Connect Folder';
        if (e.name === 'AbortError' || e.message.includes('aborted')) {
            console.log('User cancelled connection.');
            return;
        }
        console.error('Connection failed:', e);
        alert('Could not connect: ' + e.message);
    }
}

async function saveToLocalFile(path, content) {
    // Check support
    if (!window.showDirectoryPicker) {
        alert('Your browser (Brave/Firefox/Safari) does not support Direct Saving.\n\nPlease use Chrome or Edge for this feature.\n\nFalling back to manual download.');
        return false;
    }

    if (!dirHandle) {
        // DIRECTLY call connect to preserve user gesture (confirm() breaks it in Brave/Strict mode)
        await connectLocalFolder();

        if (!dirHandle) return false;
    }

    try {
        // Split path into parts (e.g., ['content', 'blog', 'posts.json'])
        const parts = path.split('/');
        const fileName = parts.pop();
        let currentHandle = dirHandle;

        // Traverse directories
        for (const part of parts) {
            currentHandle = await currentHandle.getDirectoryHandle(part, { create: true });
        }

        // Get file handle and write
        const fileHandle = await currentHandle.getFileHandle(fileName, { create: true });
        // Write content
        const writable = await fileHandle.createWritable();

        if (content instanceof Blob || content instanceof ArrayBuffer || content instanceof Uint8Array) {
            await writable.write(content);
        } else if (typeof content === 'object') {
            await writable.write(JSON.stringify(content, null, 4));
        } else {
            await writable.write(content);
        }
        await writable.close();
        return true;
    } catch (e) {
        console.error('Direct save failed:', e);
        alert('File Save Failed: ' + e.message);
        return false;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    // Attempt to restore handle if possible (requires user gesture usually, but good for structure)
    // For now, user must click Connect each session
    await loadAllData();
    setupEventListeners();
    updateStats();
    initEasyMDE();
    loadMediaList();
});

async function loadAllData() {
    try {
        // Dashboard checks localStorage for preview, fallback to files
        const savedConfig = localStorage.getItem('0x3d_config');
        if (savedConfig) {
            config = JSON.parse(savedConfig);
            console.log('Loaded config from localStorage');
        } else {
            const configResp = await fetch('../content/config.json');
            config = await configResp.json();
            console.log('Loaded config from file');
        }

        const savedPosts = localStorage.getItem('0x3d_posts');
        if (savedPosts) {
            posts = JSON.parse(savedPosts);
        } else {
            const postsResp = await fetch('../content/blog/posts.json');
            posts = await postsResp.json();
        }

        // Load languages
        for (const lang of ['nim', 'python', 'js', 'c-cpp', 'golang', 'rust']) {
            const saved = localStorage.getItem(`0x3d_lang_${lang}`);
            if (saved) {
                languageData[lang] = JSON.parse(saved);
            } else {
                try {
                    const resp = await fetch(`../content/db/${lang}.md`);
                    if (!resp.ok) throw new Error('No file');
                    const text = await resp.text();
                    languageData[lang] = parseMarkdownDB(text);
                } catch (e) {
                    languageData[lang] = { title: lang, description: '', sections: [] };
                }
            }
        }

        // Load resources
        const resList = ['cheatsheets', 'apis', 'security', 'snippets', 'ai-ml', 'cybersecurity', 'design', 'learning', 'devops', 'linux', 'other'];
        for (const res of resList) {
            const saved = localStorage.getItem(`0x3d_res_${res}`);
            if (saved) {
                resourceData[res] = JSON.parse(saved);
            } else {
                try {
                    const resp = await fetch(`../content/db/${res}.md`);
                    if (!resp.ok) throw new Error('No file');
                    const text = await resp.text();
                    resourceData[res] = parseMarkdownDB(text);
                } catch (e) {
                    resourceData[res] = { title: res, description: '', sections: [] };
                }
            }
        }

        // Populate UI
        renderPosts();
        renderNavigation();
        renderLanguageContent();
        renderResourceContent();
        populateSettings();

    } catch (e) {
        console.error('Failed to load data:', e);
        alert('Error loading data: ' + e.message);
    }
}

// Save to localStorage for dashboard preview
function saveToLocalStorage() {
    localStorage.setItem('0x3d_config', JSON.stringify(config));
    localStorage.setItem('0x3d_posts', JSON.stringify(posts));
    Object.entries(languageData).forEach(([k, v]) => {
        localStorage.setItem(`0x3d_lang_${k}`, JSON.stringify(v));
    });
    Object.entries(resourceData).forEach(([k, v]) => {
        localStorage.setItem(`0x3d_res_${k}`, JSON.stringify(v));
    });
}

// Clear localStorage and reload from files
function resetToFiles() {
    if (confirm('This will discard all unsaved changes and reload from original files. Continue?')) {
        Object.keys(localStorage).filter(k => k.startsWith('0x3d_')).forEach(k => localStorage.removeItem(k));
        location.reload();
    }
}

function setupEventListeners() {
    // Sidebar navigation
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const panel = item.dataset.panel;
            if (panel) showPanel(panel);
        });
    });

    // Language tabs
    document.querySelectorAll('.lang-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.lang-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentLang = tab.dataset.lang;
            renderLanguageContent();
        });
    });

    // Resource tabs
    document.querySelectorAll('.res-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.res-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentRes = tab.dataset.res;
            renderResourceContent();
        });
    });

    // Upload zone
    const uploadZone = document.getElementById('upload-zone');
    const fileInput = document.getElementById('file-input');

    uploadZone.addEventListener('click', () => fileInput.click());
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('dragover');
    });
    uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));
    uploadZone.addEventListener('drop', handleFileDrop);
    fileInput.addEventListener('change', handleFileSelect);

    // Export all
    document.getElementById('export-all-btn').addEventListener('click', exportAllData);
}

function initEasyMDE() {
    const textarea = document.getElementById('post-content');
    if (textarea && !easyMDE) {
        easyMDE = new EasyMDE({
            element: textarea,
            spellChecker: false,
            autosave: { enabled: false },
            placeholder: 'Write your post content in Markdown...',
            toolbar: ['bold', 'italic', 'heading', '|', 'quote', 'code', 'unordered-list', 'ordered-list', '|', 'link', 'image', '|', 'preview', 'fullscreen']
        });
    }
}

// ========================================
// Panel Navigation
// ========================================

function showPanel(panelName) {
    // Update sidebar active state
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.panel === panelName) {
            item.classList.add('active');
        }
    });

    // Show panel
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById(`panel-${panelName}`);
    if (panel) panel.classList.add('active');

    // Update title
    const titles = {
        dashboard: 'Dashboard',
        posts: 'Blog Posts',
        languages: 'Language Hubs',
        resources: 'Resources',
        media: 'Media Library',
        navigation: 'Navigation Manager',
        settings: 'Settings',
        help: 'Help & Instructions'
    };
    document.getElementById('panel-title').textContent = titles[panelName] || panelName;
}

// ========================================
// Statistics
// ========================================

function updateStats() {
    document.getElementById('stat-posts').textContent = posts.length;
    document.getElementById('stat-languages').textContent = Object.keys(languageData).length;
    document.getElementById('stat-resources').textContent = Object.keys(resourceData).length;
    document.getElementById('stat-nav').textContent = config.navigation?.length || 0;
}

// ========================================
// Posts Management
// ========================================

function renderPosts() {
    const container = document.getElementById('posts-list');
    if (!container) return;

    if (posts.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted);">No posts yet. Create your first post!</p>';
        return;
    }

    container.innerHTML = posts.map((post, i) => `
        <div class="post-item">
            <div class="post-item-info">
                <span class="post-item-title">${post.title}</span>
                <span class="post-item-meta">${post.date} • ${post.category || 'Uncategorized'} ${post.featured ? '⭐' : ''}</span>
            </div>
            <div class="post-item-actions">
                <button class="btn btn-sm btn-secondary" onclick="editPost(${i})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deletePost(${i})">Delete</button>
            </div>
        </div>
    `).join('');
}

function openPostEditor(index = -1) {
    editingPostIndex = index;

    if (index >= 0 && posts[index]) {
        const post = posts[index];
        document.getElementById('post-editor-title').textContent = 'Edit Post';
        document.getElementById('post-title').value = post.title || '';
        document.getElementById('post-category').value = post.category || 'Tutorial';
        document.getElementById('post-date').value = post.date || '';
        document.getElementById('post-reading-time').value = post.readingTime || '';
        document.getElementById('post-featured').checked = post.featured || false;
        document.getElementById('post-author').value = post.author?.name || '0x3d Team';
        document.getElementById('post-banner').value = post.banner || '../img/logo.png';
        document.getElementById('post-snippet').value = post.snippet || '';
        if (easyMDE) easyMDE.value('');
    } else {
        document.getElementById('post-editor-title').textContent = 'New Post';
        document.getElementById('post-title').value = '';
        document.getElementById('post-category').value = 'Tutorial';
        document.getElementById('post-date').value = new Date().toISOString().split('T')[0];
        document.getElementById('post-reading-time').value = '5 min read';
        document.getElementById('post-featured').checked = false;
        document.getElementById('post-author').value = '0x3d Team';
        document.getElementById('post-banner').value = '../img/logo.png';
        document.getElementById('post-snippet').value = '';
        if (easyMDE) easyMDE.value('');
    }

    openModal('post-editor-modal');
    if (easyMDE) easyMDE.codemirror.refresh();
}

function editPost(index) {
    openPostEditor(index);
}

async function savePost() {
    const title = document.getElementById('post-title').value.trim();
    if (!title) {
        alert('Please enter a title');
        return;
    }

    const fileName = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.md';

    const postData = {
        title: title,
        date: document.getElementById('post-date').value,
        banner: document.getElementById('post-banner').value || '../img/logo.png',
        snippet: document.getElementById('post-snippet').value,
        file: fileName,
        category: document.getElementById('post-category').value,
        featured: document.getElementById('post-featured').checked,
        readingTime: document.getElementById('post-reading-time').value,
        author: {
            name: document.getElementById('post-author').value || '0x3d Team',
            avatar: '../img/logo.png'
        }
    };

    if (editingPostIndex >= 0) {
        posts[editingPostIndex] = postData;
    } else {
        posts.push(postData);
    }

    // Prepare content for saving
    const content = easyMDE ? easyMDE.value() : document.getElementById('post-content').value;
    const mdContent = `BANNER: ${postData.banner}\nDATE: ${postData.date}\n\n# ${title}\n\n${content}`;

    // Try Direct Save using File System Access API
    // We call saveToLocalFile directly. It handles the connection prompt internally if needed.
    const metaSaved = await saveToLocalFile('content/blog/posts.json', posts);

    // Only attempt to save content if direct save is working (handle exists)
    let contentSaved = false;
    if (dirHandle) {
        contentSaved = await saveToLocalFile('content/blog/' + fileName, mdContent);
    }

    renderPosts();
    updateStats();
    closeModal('post-editor-modal');
    saveToLocalStorage();

    if (metaSaved && contentSaved) {
        alert('Post saved successfully (Metadata & Content)!');
    } else {
        // Fallback or Failure handling
        // If metaSaved is false, it means either:
        // 1. Browser not supported
        // 2. User cancelled connection
        // 3. Save error
        // In all cases, we offer download.

        if (confirm('Direct Save not available or cancelled.\n\nDownload files for manual deployment?')) {
            downloadJSON(posts, 'posts.json');
            downloadFile(mdContent, fileName, 'text/markdown');
            alert(`1. Place posts.json in content/blog/\n2. Place ${fileName} in content/blog/`);
        }
    }
}

async function downloadPost() {
    const title = document.getElementById('post-title').value.trim();
    const content = easyMDE ? easyMDE.value() : document.getElementById('post-content').value;
    const banner = document.getElementById('post-banner').value;
    const date = document.getElementById('post-date').value;

    const mdContent = `BANNER: ${banner}\nDATE: ${date}\n\n# ${title}\n\n${content}`;
    const fileName = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.md';

    // Try Direct Save
    if (await saveToLocalFile('content/blog/' + fileName, mdContent)) {
        alert('Post content saved directly to ' + fileName);
    } else {
        downloadFile(mdContent, fileName, 'text/markdown');
    }
}

async function deletePost(index) {
    if (confirm('Are you sure you want to delete this post?')) {
        posts.splice(index, 1);
        renderPosts();
        updateStats();

        // Save
        saveToLocalStorage();
        if (await saveToLocalFile('content/blog/posts.json', posts)) {
            alert('Post deleted and posts.json updated!');
        } else {
            if (confirm('Post deleted locally! Download new posts.json?')) {
                downloadJSON(posts, 'posts.json');
            }
        }
    }
}

// ========================================
// Navigation Management
// ========================================

function renderNavigation() {
    const container = document.getElementById('nav-list');
    if (!container || !config.navigation) return;

    container.innerHTML = config.navigation.map((nav, i) => `
        <div class="nav-item-row">
            <div class="nav-item-info">
                <span class="post-item-title">${nav.label}</span>
                <span class="nav-item-url">${nav.url}</span>
            </div>
            <div class="nav-item-actions">
                <button class="btn btn-sm btn-secondary" onclick="editNavItem(${i})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteNavItem(${i})">Delete</button>
            </div>
        </div>
    `).join('');
}

function openAddNavModal() {
    document.getElementById('nav-label').value = '';
    document.getElementById('nav-url').value = '';
    openModal('add-nav-modal');
}

async function addNavItem() {
    const label = document.getElementById('nav-label').value.trim();
    const url = document.getElementById('nav-url').value.trim();

    if (!label || !url) {
        alert('Please fill in both fields');
        return;
    }

    if (!config.navigation) config.navigation = [];
    config.navigation.push({ label, url });

    renderNavigation();
    updateStats();
    closeModal('add-nav-modal');

    // Save
    saveToLocalStorage();
    if (await saveToLocalFile('content/config.json', config)) {
        alert('Navigation item added!');
    } else {
        if (confirm('Item added locally! Download updated config.json?')) {
            downloadJSON(config, 'config.json');
        }
    }
}

async function editNavItem(index) {
    const nav = config.navigation[index];
    const newLabel = prompt('Label:', nav.label);
    const newUrl = prompt('URL:', nav.url);

    if (newLabel && newUrl) {
        config.navigation[index] = { label: newLabel, url: newUrl };
        renderNavigation();

        // Save
        saveToLocalStorage();
        if (await saveToLocalFile('content/config.json', config)) {
            alert('Navigation updated!');
        } else {
            if (confirm('Navigation updated! Download config.json?')) {
                downloadJSON(config, 'config.json');
            }
        }
    }
}

async function deleteNavItem(index) {
    if (confirm('Delete this navigation item?')) {
        config.navigation.splice(index, 1);
        renderNavigation();
        updateStats();

        // Save
        saveToLocalStorage();
        if (await saveToLocalFile('content/config.json', config)) {
            alert('Navigation updated!');
        } else {
            if (confirm('Item deleted! Download new config.json?')) {
                downloadJSON(config, 'config.json');
            }
        }
    }
}

async function saveNavigation() {
    saveToLocalStorage();

    // Try Direct Save
    if (await saveToLocalFile('content/config.json', config)) {
        alert('Navigation saved directly to disk!');
        return;
    }

    if (confirm('Navigation saved to dashboard preview!\n\nDownload config.json for permanent changes?')) {
        downloadJSON(config, 'config.json');
        alert('Place the downloaded config.json in content/ folder to apply changes.');
    }
}

// ========================================
// Language Hubs Management
// ========================================

function renderLanguageContent() {
    const container = document.getElementById('language-content');
    if (!container) return;

    const data = languageData[currentLang];
    if (!data || !data.sections) {
        container.innerHTML = '<p style="color: var(--text-muted);">No sections yet.</p>';
        return;
    }

    container.innerHTML = `
        <div class="lang-header" style="margin-bottom: 1rem;">
            <h3>${data.title || currentLang}</h3>
            <p style="color: var(--text-muted);">${data.description || ''}</p>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="addSection()" style="margin-bottom: 1rem;">+ Add Section</button>
        ${data.sections.map((section, i) => `
            <div class="section-block">
                <div class="section-header">
                    <h4>${section.name}</h4>
                    <div>
                        <button class="btn btn-sm btn-secondary" onclick="editSection(${i})">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteSection(${i})">Delete</button>
                    </div>
                </div>
                <div class="section-items">
                    ${section.items?.map((item, j) => `
                        <div class="section-item">
                            <div class="section-item-info">
                                <span class="section-item-name">${item.name}</span>
                                <span class="section-item-url">${item.url}</span>
                            </div>
                        </div>
                    `).join('') || '<p style="color: var(--text-muted);">No items</p>'}
                </div>
            </div>
        `).join('')}
    `;
}

function openAddLanguageModal() {
    document.getElementById('new-lang-name').value = '';
    document.getElementById('new-lang-desc').value = '';
    openModal('add-language-modal');
}

async function createLanguageHub() {
    const name = document.getElementById('new-lang-name').value.trim();
    const desc = document.getElementById('new-lang-desc').value.trim();

    if (!name) {
        alert('Please enter a language name');
        return;
    }

    const key = name.toLowerCase().replace(/[^a-z0-9]+/g, '');
    languageData[key] = {
        title: name + ' Developer Resources',
        description: desc,
        sections: []
    };

    // Add tab
    const tabs = document.querySelector('.language-tabs');
    const newTab = document.createElement('button');
    newTab.className = 'lang-tab';
    newTab.dataset.lang = key;
    newTab.textContent = name;
    newTab.addEventListener('click', () => {
        document.querySelectorAll('.lang-tab').forEach(t => t.classList.remove('active'));
        newTab.classList.add('active');
        currentLang = key;
        renderLanguageContent();
    });
    tabs.appendChild(newTab);

    // Also add to navigation
    if (!config.navigation) config.navigation = [];
    config.navigation.push({
        label: name,
        url: `/${key}/index.html`
    });

    updateStats();
    closeModal('add-language-modal');

    // Save and Sync
    saveToLocalStorage();

    const mdContent = convertToMarkdown(languageData[key]);
    if (await saveToLocalFile(`content/db/${key}.md`, mdContent)) {
        alert(`Created ${name} hub directly!`);
    } else {
        downloadFile(mdContent, `${key}.md`, 'text/markdown');
        alert(`Created ${name} hub! Save as content/db/${key}.md`);
    }
}

function addSection() {
    editingSectionIndex = -1;
    document.getElementById('section-editor-title').textContent = 'Add Section';
    document.getElementById('section-name').value = '';
    document.getElementById('section-items-list').innerHTML = '';
    addSectionItem();
    openModal('section-editor-modal');
}

function editSection(index) {
    const data = languageData[currentLang];
    const section = data.sections[index];

    editingSectionIndex = index;
    document.getElementById('section-editor-title').textContent = 'Edit Section';
    document.getElementById('section-name').value = section.name;

    const itemsList = document.getElementById('section-items-list');
    itemsList.innerHTML = '';

    section.items?.forEach((item, i) => {
        const row = createItemRow(item.name, item.url, item.description);
        itemsList.appendChild(row);
    });

    if (!section.items || section.items.length === 0) {
        addSectionItem();
    }

    openModal('section-editor-modal');
}

function addSectionItem() {
    const container = document.getElementById('section-items-list');
    const row = createItemRow('', '', '');
    container.appendChild(row);
}

function createItemRow(name = '', url = '', desc = '') {
    const row = document.createElement('div');
    row.className = 'item-row';
    row.innerHTML = `
        <input type="text" placeholder="Name" value="${name}">
        <input type="text" placeholder="URL" value="${url}">
        <input type="text" placeholder="Description" value="${desc}">
        <button class="btn-remove" onclick="this.parentElement.remove()">×</button>
    `;
    return row;
}

async function saveSection() {
    const name = document.getElementById('section-name').value.trim();
    if (!name) {
        alert('Please enter a section name');
        return;
    }

    const items = [];
    document.querySelectorAll('#section-items-list .item-row').forEach(row => {
        const inputs = row.querySelectorAll('input');
        if (inputs[0].value.trim()) {
            items.push({
                name: inputs[0].value.trim(),
                url: inputs[1].value.trim(),
                description: inputs[2].value.trim()
            });
        }
    });

    const section = { name, items };

    if (!languageData[currentLang].sections) {
        languageData[currentLang].sections = [];
    }

    if (editingSectionIndex >= 0) {
        languageData[currentLang].sections[editingSectionIndex] = section;
    } else {
        languageData[currentLang].sections.push(section);
    }

    renderLanguageContent();
    closeModal('section-editor-modal');

    // Save and Sync
    saveToLocalStorage();

    const mdContent = convertToMarkdown(languageData[currentLang]);
    if (await saveToLocalFile(`content/db/${currentLang}.md`, mdContent)) {
        alert('Language section saved directly!');
    } else if (confirm('Section saved to dashboard! Download MD?')) {
        downloadFile(mdContent, `${currentLang}.md`, 'text/markdown');
    }
}

async function deleteSection(index) {
    if (confirm('Delete this section?')) {
        languageData[currentLang].sections.splice(index, 1);
        renderLanguageContent();

        // Save
        saveToLocalStorage();
        const mdContent = convertToMarkdown(languageData[currentLang]);
        if (await saveToLocalFile(`content/db/${currentLang}.md`, mdContent)) {
            alert('Section deleted and file updated!');
        } else {
            if (confirm('Section deleted! Download new MD?')) {
                downloadFile(mdContent, `${currentLang}.md`, 'text/markdown');
            }
        }
    }
}

// ========================================
// Resources Management
// ========================================

function renderResourceContent() {
    const container = document.getElementById('resource-content');
    if (!container) return;

    const data = resourceData[currentRes];
    // Data is now { title, description, sections: [...] }
    if (!data || !data.sections || data.sections.length === 0) {
        container.innerHTML = `
            <p style="color: var(--text-muted);">No items yet.</p>
            <button class="btn btn-secondary btn-sm" onclick="openResourceItemModal(-1)">+ Add Item</button>
            <button class="btn btn-secondary btn-sm" onclick="addResourceCategory()">+ Add Category</button>
        `;
        return;
    }

    container.innerHTML = `
        <div class="lang-header" style="margin-bottom: 1rem;">
            <h3>${data.title || currentRes}</h3>
            <button class="btn btn-secondary btn-sm" onclick="addResourceCategory()" style="margin-right: 10px;">+ Add Category</button>
            <button class="btn btn-secondary btn-sm" onclick="openResourceItemModal(-1)">+ Add Item to General</button>
        </div>
        ${data.sections.map((cat, i) => `
            <div class="section-block">
                <div class="section-header">
                    <h4>${cat.name}</h4>
                    <div>
                        <button class="btn btn-sm btn-secondary" onclick="editResourceCategory(${i})">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteResourceCategory(${i})">Delete</button>
                    </div>
                </div>
                <div class="section-items">
                    ${cat.items?.map((item, j) => `
                        <div class="section-item">
                            <div class="section-item-info">
                                <span class="section-item-name">${item.name}</span>
                                <span class="section-item-url">${item.url || item.desc || ''}</span>
                            </div>
                            <div>
                                <button class="btn btn-sm btn-secondary" onclick="editResourceItem(${i}, ${j})">Edit</button>
                                <button class="btn btn-sm btn-danger" onclick="deleteResourceItem(${i}, ${j})">Delete</button>
                            </div>
                        </div>
                    `).join('') || '<p>No items</p>'}
                </div>
            </div>
        `).join('')}
    `;
}

function openAddResourceModal() {
    document.getElementById('new-res-name').value = '';
    document.getElementById('new-res-type').value = 'flat';
    openModal('add-resource-modal');
}

async function createResourceType() {
    const name = document.getElementById('new-res-name').value.trim();
    // const type = document.getElementById('new-res-type').value; // Type is irrelevant now, everything is section-based

    if (!name) {
        alert('Please enter a resource name');
        return;
    }

    const key = name.toLowerCase().replace(/[^a-z0-9]+/g, '');
    resourceData[key] = {
        title: name,
        description: 'Resource Collection',
        sections: [{ name: 'General', items: [] }]
    };

    // Add tab
    const tabs = document.querySelector('.resource-tabs');
    const newTab = document.createElement('button');
    newTab.className = 'res-tab';
    newTab.dataset.res = key;
    newTab.textContent = name;
    newTab.addEventListener('click', () => {
        document.querySelectorAll('.res-tab').forEach(t => t.classList.remove('active'));
        newTab.classList.add('active');
        currentRes = key;
        renderResourceContent();
    });
    tabs.appendChild(newTab);

    updateStats();
    closeModal('add-resource-modal');

    // Save and Sync
    saveToLocalStorage();

    const mdContent = convertToMarkdown(resourceData[key]);
    if (await saveToLocalFile(`content/db/${key}.md`, mdContent)) {
        alert(`Created ${name} directly!`);
    } else {
        downloadFile(mdContent, `${key}.md`, 'text/markdown');
        alert(`Created ${name}! Save to content/db/${key}.md`);
    }
}

// Resource Item Management updated for sections
// We need to track section index and item index
let editingResSectionIndex = 0;

function openResourceItemModal(sectionIndex = -1, itemIndex = -1) {
    editingResSectionIndex = sectionIndex === -1 ? 0 : sectionIndex; // Default to first section (General) if -1
    editingItemIndex = itemIndex;

    const sections = resourceData[currentRes].sections;
    if (sections.length === 0) sections.push({ name: 'General', items: [] });

    const section = sections[editingResSectionIndex];
    document.getElementById('resource-item-title').textContent = itemIndex >= 0 ? 'Edit Item' : 'Add Item';

    if (itemIndex >= 0 && section?.items[itemIndex]) {
        const item = section.items[itemIndex];
        document.getElementById('res-item-name').value = item.name || '';
        document.getElementById('res-item-url').value = item.url || '';
        document.getElementById('res-item-desc').value = item.description || item.desc || '';
        // Badges not strictly supported in MD simple parser, put in description
        document.getElementById('res-item-badges').value = '';
    } else {
        document.getElementById('res-item-name').value = '';
        document.getElementById('res-item-url').value = '';
        document.getElementById('res-item-desc').value = '';
        document.getElementById('res-item-badges').value = '';
    }

    document.getElementById('res-item-badges-group').style.display = 'none'; // Simplify

    openModal('resource-item-modal');
}

function editResourceItem(sectionIndex, itemIndex) {
    openResourceItemModal(sectionIndex, itemIndex);
}

async function saveResourceItem() {
    const name = document.getElementById('res-item-name').value.trim();
    const url = document.getElementById('res-item-url').value.trim();
    const desc = document.getElementById('res-item-desc').value.trim();

    if (!name) {
        alert('Please enter a name');
        return;
    }

    const item = { name, url, description: desc };

    // Ensure section exists
    if (!resourceData[currentRes].sections[editingResSectionIndex]) {
        resourceData[currentRes].sections.push({ name: 'General', items: [] });
        editingResSectionIndex = resourceData[currentRes].sections.length - 1;
    }

    if (editingItemIndex >= 0) {
        resourceData[currentRes].sections[editingResSectionIndex].items[editingItemIndex] = item;
    } else {
        resourceData[currentRes].sections[editingResSectionIndex].items.push(item);
    }

    renderResourceContent();
    closeModal('resource-item-modal');

    // Save
    saveToLocalStorage();
    const mdContent = convertToMarkdown(resourceData[currentRes]);
    if (await saveToLocalFile(`content/db/${currentRes}.md`, mdContent)) {
        alert('Resource saved directly!');
    } else if (confirm('Resource saved to dashboard! Download MD?')) {
        downloadFile(mdContent, `${currentRes}.md`, 'text/markdown');
    }
}

async function deleteResourceItem(sectionIndex, itemIndex) {
    if (confirm('Delete this item?')) {
        resourceData[currentRes].sections[sectionIndex].items.splice(itemIndex, 1);
        renderResourceContent();

        saveToLocalStorage();
        const mdContent = convertToMarkdown(resourceData[currentRes]);
        if (await saveToLocalFile(`content/db/${currentRes}.md`, mdContent)) {
            alert('Item deleted and file updated!');
        } else {
            if (confirm('Resource saved! Download MD?')) {
                downloadFile(mdContent, `${currentRes}.md`, 'text/markdown');
            }
        }
    }
}

async function addResourceCategory() {
    const name = prompt('Category name:');
    if (name) {
        resourceData[currentRes].sections.push({ name: name, items: [] });
        renderResourceContent();

        saveToLocalStorage();
        const mdContent = convertToMarkdown(resourceData[currentRes]);
        if (await saveToLocalFile(`content/db/${currentRes}.md`, mdContent)) {
            alert('Category added and file updated!');
        } else {
            if (confirm('Resource saved! Download MD?')) {
                downloadFile(mdContent, `${currentRes}.md`, 'text/markdown');
            }
        }
    }
}

function editResourceCategory(index) {
    const newName = prompt('New Category Name:', resourceData[currentRes].sections[index].name);
    if (newName) {
        resourceData[currentRes].sections[index].name = newName;
        renderResourceContent();
        // Trigger save... 
    }
}

async function deleteResourceCategory(index) {
    if (confirm('Delete this category and all its items?')) {
        resourceData[currentRes].sections.splice(index, 1);
        renderResourceContent();

        saveToLocalStorage();
        const mdContent = convertToMarkdown(resourceData[currentRes]);
        if (await saveToLocalFile(`content/db/${currentRes}.md`, mdContent)) {
            alert('Category deleted and file updated!');
        } else {
            if (confirm('Resource saved! Download MD?')) {
                downloadFile(mdContent, `${currentRes}.md`, 'text/markdown');
            }
        }
    }
}

// ========================================
// Media Library
// ========================================

function handleFileDrop(e) {
    e.preventDefault();
    document.getElementById('upload-zone').classList.remove('dragover');
    const files = e.dataTransfer.files;
    processFiles(files);
}

function handleFileSelect(e) {
    const files = e.target.files;
    processFiles(files);
}

function processFiles(files) {
    const preview = document.getElementById('upload-preview');

    Array.from(files).forEach(file => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const div = document.createElement('div');
            div.className = 'preview-item';

            if (file.type.startsWith('image/')) {
                div.innerHTML = `
                    <img src="${e.target.result}" alt="${file.name}">
                    <div class="preview-item-name">${file.name}</div>
                    <div class="preview-item-actions">
                        <button class="btn btn-sm btn-success" onclick="downloadMedia('${e.target.result}', '${file.name}')">Download</button>
                        <button class="btn btn-sm btn-secondary" onclick="copyPath('img/${file.name}')">Copy Path</button>
                    </div>
                `;
            } else {
                div.innerHTML = `
                    <div style="height: 100px; display: flex; align-items: center; justify-content: center; font-size: 2rem;">📁</div>
                    <div class="preview-item-name">${file.name}</div>
                    <div class="preview-item-actions">
                        <button class="btn btn-sm btn-success" onclick="downloadMedia('${e.target.result}', '${file.name}')">Download</button>
                    </div>
                `;
            }

            preview.appendChild(div);
        };

        reader.readAsDataURL(file);
    });
}

async function downloadMedia(dataUrl, filename) {
    try {
        const res = await fetch(dataUrl);
        const blob = await res.blob();

        if (await saveToLocalFile('img/' + filename, blob)) {
            alert(`Saved ${filename} directly to img/ folder!`);
            return;
        }

        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = filename;
        a.click();
        alert(`Save to your img/ folder as "${filename}"`);
    } catch (e) {
        console.error('Media save failed:', e);
        alert('Error saving media: ' + e.message);
    }
}

function copyPath(path) {
    navigator.clipboard.writeText(path);
    alert(`Copied: ${path}`);
}

function loadMediaList() {
    // Since we can't scan the filesystem, show known media paths
    const mediaList = document.getElementById('media-list');
    const knownMedia = ['logo.png', 'icon-circle.png'];

    mediaList.innerHTML = knownMedia.map(name => `
        <div class="media-item" onclick="copyPath('img/${name}')">
            <img src="../img/${name}" alt="${name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📁</text></svg>'">
            <span>${name}</span>
        </div>
    `).join('');
}

// ========================================
// Settings
// ========================================

function populateSettings() {
    // Social - handle both object and array formats
    const social = config.social || [];
    if (Array.isArray(social)) {
        const github = social.find(s => s.icon === 'github' || s.label === 'GitHub');
        const discord = social.find(s => s.icon === 'discord' || s.label === 'Discord');
        const twitter = social.find(s => s.icon === 'twitter' || s.label === 'Twitter');
        const youtube = social.find(s => s.icon === 'youtube' || s.label === 'YouTube');
        document.getElementById('social-github').value = github?.url || '';
        document.getElementById('social-discord').value = discord?.url || '';
        document.getElementById('social-twitter').value = twitter?.url || '';
        document.getElementById('social-youtube').value = youtube?.url || '';
    } else {
        document.getElementById('social-github').value = social.github || '';
        document.getElementById('social-discord').value = social.discord || '';
        document.getElementById('social-twitter').value = social.twitter || '';
        document.getElementById('social-youtube').value = social.youtube || '';
    }

    // Branding - handle both site and branding keys
    document.getElementById('site-name').value = config.site?.name || config.branding?.name || '0x3d Hub';
    document.getElementById('site-tagline').value = config.site?.description || config.branding?.tagline || '';
    document.getElementById('site-logo').value = config.branding?.logo || 'img/logo.png';

    // Meta
    document.getElementById('meta-description').value = config.meta?.description || config.site?.description || '';
    document.getElementById('meta-keywords').value = config.meta?.keywords || '';
}

async function saveSettings() {
    // Save social links in array format for compatibility
    config.social = [
        { label: 'GitHub', url: document.getElementById('social-github').value, icon: 'github' },
        { label: 'Discord', url: document.getElementById('social-discord').value, icon: 'discord' },
        { label: 'Twitter', url: document.getElementById('social-twitter').value, icon: 'twitter' },
        { label: 'YouTube', url: document.getElementById('social-youtube').value, icon: 'youtube' }
    ].filter(s => s.url);

    config.site = {
        name: document.getElementById('site-name').value,
        description: document.getElementById('site-tagline').value
    };

    config.branding = {
        name: document.getElementById('site-name').value,
        tagline: document.getElementById('site-tagline').value,
        logo: document.getElementById('site-logo').value
    };

    config.meta = {
        description: document.getElementById('meta-description').value,
        keywords: document.getElementById('meta-keywords').value
    };

    saveToLocalStorage();

    // Try Direct Save
    if (await saveToLocalFile('content/config.json', config)) {
        alert('Settings saved directly to disk!');
        return;
    }

    if (confirm('Settings saved to dashboard preview!\n\nDownload config.json for permanent changes?')) {
        downloadJSON(config, 'config.json');
        alert('Place downloaded config.json in content/ folder.');
    }
}

// ========================================
// Modals
// ========================================

function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

// Close modal on backdrop click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// ========================================
// Download/Export Utilities
// ========================================

function downloadJSON(data, filename) {
    const json = JSON.stringify(data, null, 4);
    downloadFile(json, filename, 'application/json');
}

function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function downloadConfig() {
    downloadJSON(config, 'config.json');
}

function exportAllData() {
    // Create a zip-like structure (as separate downloads)
    downloadJSON(config, 'config.json');
    downloadJSON(posts, 'posts.json');

    Object.entries(languageData).forEach(([key, data]) => {
        downloadJSON(data, `${key}.json`);
    });

    Object.entries(resourceData).forEach(([key, data]) => {
        downloadJSON(data, `${key}.json`);
    });

    alert('All data files downloaded! Place them in their respective content/ folders.');
}

// Make functions globally accessible
window.showPanel = showPanel;
window.openPostEditor = openPostEditor;
window.editPost = editPost;
window.savePost = savePost;
window.downloadPost = downloadPost;
window.deletePost = deletePost;
window.openAddNavModal = openAddNavModal;
window.addNavItem = addNavItem;
window.editNavItem = editNavItem;
window.deleteNavItem = deleteNavItem;
window.saveNavigation = saveNavigation;
window.downloadConfig = downloadConfig;
window.openAddLanguageModal = openAddLanguageModal;
window.createLanguageHub = createLanguageHub;
window.addSection = addSection;
window.editSection = editSection;
window.addSectionItem = addSectionItem;
window.saveSection = saveSection;
window.deleteSection = deleteSection;
window.openAddResourceModal = openAddResourceModal;
window.createResourceType = createResourceType;
window.openResourceItemModal = openResourceItemModal;
window.editResourceItem = editResourceItem;
window.saveResourceItem = saveResourceItem;
window.deleteResourceItem = deleteResourceItem;
window.addResourceCategory = addResourceCategory;
window.editResourceCategory = editResourceCategory;
window.deleteResourceCategory = deleteResourceCategory;
window.saveSettings = saveSettings;
window.exportAllData = exportAllData;
window.closeModal = closeModal;
window.downloadMedia = downloadMedia;
window.copyPath = copyPath;
