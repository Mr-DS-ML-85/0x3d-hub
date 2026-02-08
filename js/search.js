/**
 * Advanced Regex Search for 0x3d Hub
 * Supports case-sensitive regex and site-wide indexing.
 */

const SiteSearch = {
    index: [],
    isIndexed: false,

    init: function () {
        this.renderOverlay();
        this.bindEvents();
    },

    renderOverlay: function () {
        if (document.getElementById('search-overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'search-overlay';
        overlay.className = 'search-overlay';
        overlay.innerHTML = `
            <div class="search-container glass">
                <div class="search-header">
                    <input type="text" id="site-search-input" placeholder="Regex Search (e.g. ^Rust.*Tutorial)..." autofocus>
                    <div class="search-options">
                        <label><input type="checkbox" id="search-case-sensitive" checked> Case Sensitive</label>
                        <label><input type="checkbox" id="search-regex" checked> Regex</label>
                    </div>
                    <button id="close-search">&times;</button>
                </div>
                <div id="search-results" class="search-results">
                    <div class="search-placeholder">Find anything on 0x3d Hub...</div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Add Styles
        const style = document.createElement('style');
        style.textContent = `
            .search-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.85); backdrop-filter: blur(10px);
                z-index: 10000; display: none; align-items: flex-start; justify-content: center;
                padding-top: 10vh;
            }
            .search-overlay.active { display: flex; }
            .search-container {
                width: 90%; max-width: 800px; max-height: 80vh;
                display: flex; flex-direction: column; overflow: hidden;
                border: 1px solid var(--glass-border); border-radius: 20px;
                box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            }
            .search-header {
                padding: 1.5rem; background: rgba(255,255,255,0.05);
                border-bottom: 1px solid var(--glass-border);
                display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;
            }
            #site-search-input {
                flex: 1; background: transparent; border: none; color: #fff;
                font-size: 1.25rem; font-family: 'JetBrains Mono', monospace; outline: none;
            }
            .search-options { font-size: 0.8rem; color: var(--text-muted); display: flex; gap: 1rem; }
            .search-options label { display: flex; align-items: center; gap: 4px; cursor: pointer; }
            #close-search { background: none; border: none; color: #fff; font-size: 2rem; cursor: pointer; opacity: 0.5; }
            #close-search:hover { opacity: 1; }
            .search-results { padding: 1.5rem; overflow-y: auto; flex: 1; }
            .search-placeholder { text-align: center; color: var(--text-muted); padding: 3rem; }
            .search-item { margin-bottom: 1.5rem; animation: slideUp 0.3s ease; }
            .search-item a { color: var(--accent-color); font-weight: 700; font-size: 1.1rem; text-decoration: none; }
            .search-item p { color: var(--text-muted); font-size: 0.9rem; margin-top: 4px; }
            .search-meta { font-size: 0.75rem; color: var(--home-accent-alt); text-transform: uppercase; letter-spacing: 1px; }
            @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        `;
        document.head.appendChild(style);
    },

    bindEvents: function () {
        const input = document.getElementById('site-search-input');
        const overlay = document.getElementById('search-overlay');
        const close = document.getElementById('close-search');

        input.addEventListener('input', () => this.performSearch());
        close.addEventListener('click', () => this.toggleSearch(false));

        // Global hotkey: Ctrl+/ or Cmd+/
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                this.toggleSearch();
            }
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                this.toggleSearch(false);
            }
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.toggleSearch(false);
        });
    },

    toggleSearch: function (show) {
        const overlay = document.getElementById('search-overlay');
        const input = document.getElementById('site-search-input');

        const force = show !== undefined ? show : !overlay.classList.contains('active');
        overlay.classList.toggle('active', force);

        if (force) {
            input.focus();
            if (!this.isIndexed) this.startIndexing();
        }
    },

    startIndexing: async function () {
        this.isIndexed = true;
        const results = document.getElementById('search-results');
        results.innerHTML = '<div class="search-placeholder">Indexing site resources...</div>';

        try {
            // Find base path
            const pathSegments = window.location.pathname.split('/').filter(Boolean);
            const isSubDir = pathSegments.length > 0 && pathSegments[0] !== 'index.html';
            const basePath = isSubDir ? '../' : './';

            const configResp = await fetch(basePath + 'content/config.json');
            const config = await configResp.json();

            // 1. Index Hubs
            const hubFiles = [
                'python', 'js', 'nim', 'c-cpp', 'rust', 'golang',
                'ai-ml', 'cybersecurity', 'design', 'learning', 'apis', 'cheatsheets',
                'devops', 'linux', 'other'
            ];

            for (const hub of hubFiles) {
                try {
                    const resp = await fetch(basePath + 'content/db/' + hub + '.md');
                    if (resp.ok) {
                        const text = await resp.text();
                        this.parseMD(text, hub, 'Resource Hub');
                    }
                } catch (e) { console.warn(`Search: Failed to index hub ${hub}`); }
            }

            // 2. Index Blogs
            try {
                const blogResp = await fetch(basePath + 'content/blog/posts.json');
                if (blogResp.ok) {
                    const blogs = await blogResp.json();
                    blogs.forEach(post => {
                        this.index.push({
                            title: post.title,
                            url: basePath + 'blog/post.html?id=' + post.id,
                            desc: post.excerpt || '',
                            source: 'Blog Post'
                        });
                    });
                }
            } catch (e) { console.warn(`Search: Failed to index blogs`); }

            results.innerHTML = '<div class="search-placeholder">Indexing complete. Search ready.</div>';
        } catch (e) {
            results.innerHTML = '<div class="search-placeholder" style="color:red">Indexing failed.</div>';
        }
    },

    parseMD: function (text, filename, sourceName) {
        // Extract links: - [Title](URL) - Description
        const lines = text.split('\n');
        lines.forEach(line => {
            const match = line.match(/^[-*]\s+\[(.*?)\]\((.*?)\)(?:\s+-\s+(.*))?$/);
            if (match) {
                this.index.push({
                    title: match[1],
                    url: match[2],
                    desc: match[3] || '',
                    source: sourceName + ': ' + filename.toUpperCase()
                });
            }
        });
    },

    performSearch: function () {
        const query = document.getElementById('site-search-input').value;
        const isCaseSensitive = document.getElementById('search-case-sensitive').checked;
        const isRegex = document.getElementById('search-regex').checked;
        const resultsContainer = document.getElementById('search-results');

        if (!query) {
            resultsContainer.innerHTML = '<div class="search-placeholder">Start typing to search...</div>';
            return;
        }

        let filtered = [];
        try {
            let filterFn;
            if (isRegex) {
                const regex = new RegExp(query, isCaseSensitive ? '' : 'i');
                filterFn = (item) => regex.test(item.title) || regex.test(item.desc) || regex.test(item.source);
            } else {
                const q = isCaseSensitive ? query : query.toLowerCase();
                filterFn = (item) => {
                    const t = isCaseSensitive ? item.title : item.title.toLowerCase();
                    const d = isCaseSensitive ? item.desc : item.desc.toLowerCase();
                    return t.includes(q) || d.includes(q);
                };
            }
            filtered = this.index.filter(filterFn);
        } catch (e) {
            resultsContainer.innerHTML = `<div class="search-placeholder" style="color:red">Invalid Regex: ${e.message}</div>`;
            return;
        }

        if (filtered.length === 0) {
            resultsContainer.innerHTML = '<div class="search-placeholder">No matches found.</div>';
            return;
        }

        resultsContainer.innerHTML = filtered.slice(0, 50).map(item => `
            <div class="search-item">
                <div class="search-meta">${item.source}</div>
                <a href="${item.url}" target="_blank">${item.title}</a>
                <p>${item.desc}</p>
            </div>
        `).join('');
    }
};

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    SiteSearch.init();
} else {
    document.addEventListener('DOMContentLoaded', () => SiteSearch.init());
}
window.SiteSearch = SiteSearch;
