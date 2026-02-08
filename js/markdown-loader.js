/**
 * Simple Markdown Parser for "Fully Offline" use.
 * Expanded for Blog Features: Banners, Dates, Audio, Video, and Downloads.
 */

const MarkdownLoader = {
    // Auto-normalize URLs with multiple slashes
    normalizeUrl: function () {
        if (window.location.pathname.includes('//')) {
            const cleanPath = window.location.pathname.replace(/\/+/g, '/');
            const newUrl = window.location.origin + cleanPath + window.location.search + window.location.hash;
            window.location.replace(newUrl);
        }
    },
    render: function (text, baseDir = '') {
        let meta = {
            banner: null,
            date: null
        };

        // 1. Extract Metadata & Remove from content flow
        let lines = text.split('\n');
        let contentLines = [];

        lines.forEach(line => {
            if (line.startsWith('BANNER:')) {
                meta.banner = line.replace('BANNER:', '').trim();
            } else if (line.startsWith('DATE:')) {
                meta.date = line.replace('DATE:', '').trim();
            } else {
                contentLines.push(line);
            }
        });

        const fullText = contentLines.join('\n');

        // 2. Prepare HTML with regex replacements (Inline Handling)
        let html = fullText
            // Headers
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            // Blockquotes
            .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
            // Horizontal Rules
            .replace(/^---$/gim, '<hr class="post-divider">')
            // Bold/Italic (Non-greedy)
            .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')
            .replace(/\*(.*?)\*/gim, '<i>$1</i>')
            // Lists (Simple unordered)
            .replace(/^[\*\-]\s+(.*)$/gim, '<li>$1</li>')

            // Link Handling (The Order Matters!)
            .replace(/\[(.*?)\]\((.*?)\)(?:\{(.*?)\})?/gim, (match, text, url, attributes) => {
                const finalUrl = (url.startsWith('http') || url.startsWith('/')) ? url : (baseDir + url);

                // A. Downloads
                if (attributes && attributes.includes('download')) {
                    return `<a href='${finalUrl}' class='download-btn' download><span>&#x1F4E5;</span> ${text}</a>`;
                }

                // B. YouTube / Embeds (Detect by URL)
                if (url.includes('youtube.com/embed/') || url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
                    let videoId = '';
                    if (url.includes('v=')) videoId = url.split('v=')[1].split('&')[0];
                    else if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1].split('?')[0];
                    else if (url.includes('embed/')) videoId = url.split('embed/')[1].split('?')[0];

                    if (videoId) {
                        return `<div class="media-container video-wrapper"><iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe></div>`;
                    }
                }

                // C. Audio Files
                if (url.match(/\.(mp3|wav|ogg)$/i) || url.includes('Audio/')) {
                    const audioId = `audio-player-${Math.random().toString(36).substr(2, 9)}`;
                    return `
                        <div class="custom-audio-player" id="${audioId}">
                            <button class="audio-play-btn" onclick="MarkdownLoader.toggleAudio('${audioId}')">
                                <svg viewBox="0 0 24 24" class="play-icon"><path d="M8 5v14l11-7z"/></svg>
                            </button>
                            <div class="audio-info-container">
                                <span class="audio-title">${text}</span>
                                <div class="audio-progress-container" onclick="MarkdownLoader.seekAudio(event, '${audioId}')">
                                    <div class="audio-progress-bar"></div>
                                </div>
                                <div class="audio-time-row">
                                    <span class="current-time">0:00</span>
                                    <span class="duration">0:00</span>
                                </div>
                            </div>
                            <audio src="${finalUrl}" style="display:none;"></audio>
                        </div>`;
                }

                // D. Standard Link
                return `<a href='${finalUrl}'>${text}</a>`;
            })

            // Images
            .replace(/!\[(.*?)\]\((.*?)\)/gim, (match, alt, url) => {
                const finalUrl = (url.startsWith('http') || url.startsWith('/')) ? url : (baseDir + url);
                return `<img alt='${alt}' src='${finalUrl}' style='max-width:100%; border-radius:8px;' />`;
            });

        // 3. Newlines to Paragraphs & List wrapping
        let inList = false;
        html = html.split('\n').map(line => {
            line = line.trim();
            if (!line) {
                if (inList) { inList = false; return '</ul>'; }
                return '';
            }

            // Handle list items
            if (line.startsWith('<li>')) {
                if (!inList) { inList = true; return '<ul>' + line; }
                return line;
            } else if (inList) {
                inList = false;
                line = '</ul>' + line;
            }

            // Don't wrap Block elements in <p>
            if (line.match(/^<(div|img|h1|h2|h3|blockquote|ul|li|p|hr|a class='download-btn')/i)) {
                return line;
            }
            return `<p>${line}</p>`;
        }).join('\n');
        if (inList) html += '</ul>';

        // 4. Final Layout
        let output = '<div class="blog-post">';

        // Inject Banner
        if (meta.banner) {
            // Robust Path Resolution for Banner
            const isSubDir = window.location.pathname.includes('/blog/') || window.location.pathname.includes('/resources/');
            let bannerPath = meta.banner;

            // If path is relative and we are in a subdir, prepend ../
            if (!bannerPath.startsWith('http') && !bannerPath.startsWith('/')) {
                if (isSubDir) {
                    bannerPath = '../' + bannerPath;
                }
            }
            output += `<img src="${bannerPath}" class="blog-banner" alt="Post Banner">`;
        }

        // Inject Date
        if (meta.date) {
            output += `<div class="blog-date">${meta.date}</div>`;
        }

        output += html;
        output += '</div>';

        return output;
    },

    // NEW: Parse Markdown Database format (for Language Hubs & Resources)
    parseMarkdownDB: function (text) {
        const lines = text.split('\n');
        let data = { title: '', description: '', sections: [] };
        let currentSection = { name: 'General', items: [] };
        let parsingDesc = true;

        lines.forEach(line => {
            line = line.trim();
            if (!line) return;

            if (line.startsWith('# ')) {
                data.title = line.substring(2).trim();
            } else if (line.startsWith('## ') || line.startsWith('### ')) {
                // Save previous section if it has items
                if (currentSection.items.length > 0) {
                    data.sections.push(currentSection);
                }
                const level = line.startsWith('## ') ? 3 : 4;
                currentSection = { name: line.substring(level).trim(), items: [] };
                parsingDesc = false;
            } else if (line.startsWith('- [')) {
                // - [Name](Url) or - [Name](Url) - Desc
                const match = line.match(/- \[(.*?)\]\((.*?)\)(?: - (.*))?/);
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

        // Push last section
        if (currentSection.items.length > 0) {
            data.sections.push(currentSection);
        }
        return data;
    },

    load: async function (filePath, targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;

        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error('Failed to load markdown');
            const data = await response.text();
            target.innerHTML = this.render(data);
        } catch (error) {
            console.error('Error loading markdown:', error);
            target.innerHTML = `<p style="color:red">Error loading content: ${error.message}</p>`;
        }
    },

    loadBlogHub: async function (jsonPath, targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;

        try {
            const response = await fetch(jsonPath);
            if (!response.ok) throw new Error('Failed to load blog index');
            const posts = await response.json();

            let html = '<div class="hub-magazine">';

            // 1. Render Featured Hero (If any featured post)
            const featuredPost = posts.find(p => p.featured);
            if (featuredPost) {
                html += `
                    <div class="hub-hero">
                        <div class="hero-card glass-blog-card">
                            <div class="hero-image" style="background-image: url('${featuredPost.banner}')">
                                <span class="badge featured-badge">FEATURED</span>
                                <span class="badge category-badge">${featuredPost.category || 'Editorial'}</span>
                            </div>
                            <div class="hero-info">
                                <div class="meta-row">
                                    <span class="meta-item author">
                                        <img src="${featuredPost.author?.avatar || '../img/logo.png'}" alt="Avatar">
                                        ${featuredPost.author?.name || '0x3d Team'}
                                    </span>
                                    <span class="meta-item date">${featuredPost.date}</span>
                                    <span class="meta-item read-time">${featuredPost.readingTime || '5 min read'}</span>
                                </div>
                                <h2><a href="post.html?f=${featuredPost.file}">${featuredPost.title}</a></h2>
                                <p>${featuredPost.snippet}</p>
                                <a href="post.html?f=${featuredPost.file}" class="btn action-btn">Read Deep-Dive</a>
                            </div>
                        </div>
                    </div>
                `;
            }

            // 2. Render Secondary Grid
            html += '<div class="hub-grid">';
            const secondaryPosts = posts.filter(p => !p.featured || p !== featuredPost);
            secondaryPosts.forEach(post => {
                html += `
                    <div class="hub-card glass-blog-card">
                        <div class="card-image" style="background-image: url('${post.banner}')">
                            <span class="badge category-badge">${post.category || 'Article'}</span>
                        </div>
                        <div class="card-content">
                            <div class="meta-row mini">
                                <span>${post.date}</span>
                                ${post.lastUpdated ? `<span class="dot">•</span><span class="updated-date">UPD: ${post.lastUpdated}</span>` : ''}
                                <span class="dot">•</span>
                                <span>${post.readingTime || 'Varies'}</span>
                            </div>
                            <h3><a href="post.html?f=${post.file}">${post.title}</a></h3>
                            <p>${post.snippet}</p>
                            <div class="card-footer">
                                <span class="author">
                                    <img src="${post.author?.avatar || '../img/logo.png'}" alt="A">
                                    ${post.author?.name || 'Team'}
                                </span>
                            </div>
                        </div>
                    </div>
                `;
            });
            html += '</div></div>';
            target.innerHTML = html;
        } catch (e) {
            console.error("Blog hub failed", e);
            target.innerHTML = '<p style="color:red">Error loading knowledge hub: ' + e.message + '</p>';
        }
    },

    loadPost: async function (targetId) {
        const params = new URLSearchParams(window.location.search);
        const fileName = params.get('f');
        const target = document.getElementById(targetId);
        if (!fileName || !target) return;

        try {
            // Find post metadata for header/metadata bar
            const postsResp = await fetch('../content/blog/posts.json');
            const posts = await postsResp.json();
            const postMeta = posts.find(p => p.file === fileName);

            const response = await fetch('../content/blog/' + fileName);
            const markdown = await response.text();

            let postHtml = `
                <div class="post-header-visual">
                    <div class="badge-row">
                        <span class="badge category-badge">${postMeta?.category || 'Deep Dive'}</span>
                    </div>
                    <h1>${postMeta?.title || 'Article View'}</h1>
                    <div class="post-meta-bar">
                        <div class="author-info">
                            <img src="${postMeta?.author?.avatar || '../img/logo.png'}" alt="Avatar">
                            <div>
                                <strong>${postMeta?.author?.name || '0x3d Team'}</strong>
                                <span>Published on ${postMeta?.date}</span>
                            </div>
                        </div>
                        <div class="reading-stats">
                            <span>${postMeta?.readingTime || '10 min read'}</span>
                            <span>Updated: ${postMeta?.lastUpdated || postMeta?.date}</span>
                        </div>
                    </div>
                </div>
                <div class="post-layout">
                    <aside class="post-sidebar">
                        <div class="toc-container glass">
                            <h4>TABLE OF CONTENTS</h4>
                            <div id="post-toc"></div>
                        </div>
                    </aside>
                    <article class="post-content-container">
                        ${this.render(markdown, '../content/blog/')}
                    </article>
                </div>
            `;
            target.innerHTML = postHtml;

            // Generate TOC after rendering content
            this.generateTOC('.post-content-container', '#post-toc');

        } catch (e) {
            console.error("Blog post failed", e);
            target.innerHTML = '<h2 style="color:red">Failed to load content.</h2><p>' + e.message + '</p>';
        }
    },

    generateTOC: function (contentSelector, tocSelector) {
        const content = document.querySelector(contentSelector);
        const toc = document.querySelector(tocSelector);
        if (!content || !toc) return;

        const headers = content.querySelectorAll('h1, h2, h3');
        let tocHtml = '<ul>';
        headers.forEach((h, i) => {
            const id = 'header-' + i;
            h.id = id;
            const level = h.tagName.toLowerCase();
            tocHtml += '<li class="toc-' + level + '"><a href="#' + id + '">' + h.innerText + '</a></li>';
        });
        tocHtml += '</ul>';
        toc.innerHTML = tocHtml;
    },

    loadSiteHeader: async function () {
        this.normalizeUrl();
        try {
            const pathSegments = window.location.pathname.split('/').filter(Boolean);
            const isSubDir = pathSegments.length > 0 && pathSegments[0] !== 'index.html';
            const basePath = isSubDir ? '../' : './';

            // Injection of Favicon
            if (!document.querySelector('link[rel="icon"]')) {
                const link = document.createElement('link');
                link.rel = 'icon';
                link.href = basePath + 'img/logo.png';
                document.head.appendChild(link);
            }

            const resp = await fetch(basePath + 'content/config.json');
            const config = await resp.json();
            const header = document.querySelector('header');

            if (header) {
                header.innerHTML = `
                    <div class="logo">
                        <a href="${basePath}index.html">
                            <img src="${basePath}img/logo.png" alt="0x3d Logo" class="logo-img">
                            0x3d <span>Hub</span>
                        </a>
                    </div>
                    <nav>
                        <ul>
                            ${config.navigation.map(n => {
                    const cleanUrl = n.url.startsWith('/') ? n.url.substring(1) : n.url;
                    const fullUrl = basePath + cleanUrl;

                    // Precise active link check
                    const pathSegments = window.location.pathname.split('/').filter(Boolean);
                    const isHomeUrl = n.url === '/index.html' || n.url === 'index.html';

                    let isActive = false;
                    if (isHomeUrl) {
                        isActive = pathSegments.length === 0 || (pathSegments.length === 1 && pathSegments[0] === 'index.html');
                    } else {
                        const navSegment = n.url.split('/').filter(Boolean)[0];
                        isActive = pathSegments.includes(navSegment);
                    }
                    return '<li><a href="' + fullUrl + '" class="' + (isActive ? 'active' : '') + '">' + n.label + '</a></li>';
                }).join('')}
                            <li class="search-trigger">
                                <a href="javascript:void(0)" onclick="SiteSearch.toggleSearch(true)" title="Search (Ctrl+/)">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px; vertical-align: middle;">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </nav>
                `;
            }

            // Also load search script if not present
            if (typeof SiteSearch === 'undefined') {
                const searchScript = document.createElement('script');
                searchScript.src = basePath + 'js/search.js';
                document.body.appendChild(searchScript);
            }

        } catch (e) { console.error("Config load failed", e); }
    },

    loadLanguagePage: async function (lang, targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;

        try {
            const pathSegments = window.location.pathname.split('/').filter(Boolean);
            const isSubDir = pathSegments.length > 0 && pathSegments[0] !== 'index.html';
            const basePath = isSubDir ? '../' : './';

            // CHANGED: Load .md instead of .json
            const response = await fetch(basePath + 'content/db/' + lang + '.md');
            if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
            const text = await response.text();
            const data = this.parseMarkdownDB(text);

            let html = `
                <section class="hero-hub">
                    <h1>${data.title}</h1>
                    <p>${data.description}</p>
                </section>
                <div class="resource-sections">
            `;

            if (data.sections && Array.isArray(data.sections)) {
                data.sections.forEach(section => {
                    html += `
                        <div class="resource-section glass-blog-card">
                            <h2 class="section-title">${section.name}</h2>
                            <ul class="resource-list">
                                ${section.items.map(item => `
                                    <li>
                                        <a href="${item.url}" target="_blank" class="resource-link">${item.name}</a>
                                        <span class="resource-desc">${item.description}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    `;
                });
            }

            html += `</div>`;
            target.innerHTML = html;
        } catch (e) {
            console.error(`Error loading ${lang} page: `, e);
            target.innerHTML = '<div style="text-align:center; padding: 5rem;"><h2 style="color:red">Error loading resources.</h2><p>' + e.message + '</p></div>';
        }
    },

    loadDynamicResources: async function (type) {
        const targetMap = {
            'cheatsheets': 'cheatsheetsList',
            'apis': 'apisList',
            'security': 'securityList',
            'snippets': 'snippetsList',
            'ai-ml': 'ai-mlList',
            'cybersecurity': 'cybersecurityList',
            'design': 'designList',
            'learning': 'learningList',
            'devops': 'devopsList',
            'linux': 'linuxList',
            'other': 'otherList'
        };
        const targetId = targetMap[type];
        const target = document.getElementById(targetId);
        if (!target) return;

        try {
            const isSubDir = window.location.pathname.includes('/resources/');
            const basePath = isSubDir ? '../' : './';
            const dbName = type === 'security' ? 'security' : type;

            // CHANGED: Load .md instead of .json
            const resp = await fetch(basePath + 'content/db/' + dbName + '.md');
            if (!resp.ok) throw new Error('Failed to load ' + dbName);
            const text = await resp.text();
            const data = this.parseMarkdownDB(text);

            // Set Title/Desc
            if (data.title && document.querySelector('main h1')) {
                document.querySelector('main h1').textContent = data.title;
            }
            if (data.description && document.querySelector('main p')) {
                document.querySelector('main p').textContent = data.description;
            }

            let html = '';

            // Render Sections
            if (data.sections.length > 0) {
                // If it's a "General" single section, maybe render differently? 
                // But for consistency let's stick to the grid or list structure.

                // For Cheatsheets/Security (Flat lists usually) => Render as one big grid if possible
                // OR render per section.

                data.sections.forEach(cat => {
                    // Only show header if it's not just "General" or if there are multiple sections
                    const showHeader = data.sections.length > 1 || cat.name !== 'General';

                    html += `
                        <div class="api-category">
                            ${showHeader ? `<h2>${cat.name}</h2>` : ''}
                            <div class="api-grid">
                                ${(cat.items || []).map(item => `
                                    <div class="api-item glass">
                                        <div>
                                            <h3>${item.name}</h3>
                                            <p>${item.description}</p>
                                        </div>
                                        <a href="${item.url || '#'}" class="btn btn-sm action-btn" target="_blank">Access</a>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                });
            }

            target.innerHTML = html;
        } catch (e) {
            console.error(`Error loading ${type}: `, e);
            target.innerHTML = '<p style="color:red">Error loading ' + type + ': ' + e.message + '</p>';
        }
    },

    // Load footer social links from config.json
    loadFooterSocial: async function () {
        try {
            const pathSegments = window.location.pathname.split('/').filter(Boolean);
            const isSubDir = pathSegments.length > 0 && pathSegments[0] !== 'index.html';
            const basePath = isSubDir ? '../' : './';

            const resp = await fetch(basePath + 'content/config.json');
            const config = await resp.json();

            const socialContainer = document.getElementById('social-links');
            if (socialContainer && config.social) {
                const social = Array.isArray(config.social) ? config.social : Object.entries(config.social).map(([k, v]) => ({ label: k, url: v }));
                socialContainer.innerHTML = social.filter(s => s.url && s.url !== '#').map(s =>
                    `<li><a href="${s.url}" target="_blank">${s.label}</a></li>`
                ).join('');
            }
        } catch (e) {
            console.error('Failed to load social links:', e);
        }
    },

    toggleAudio: function (playerId) {
        const player = document.getElementById(playerId);
        const audio = player.querySelector('audio');
        const btn = player.querySelector('.audio-play-btn');
        const playIcon = '<svg viewBox="0 0 24 24" class="play-icon"><path d="M8 5v14l11-7z"/></svg>';
        const pauseIcon = '<svg viewBox="0 0 24 24" class="pause-icon"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';

        if (audio.paused) {
            // Pause all other audios first
            document.querySelectorAll('audio').forEach(a => {
                if (a !== audio) {
                    a.pause();
                    const otherPlayer = a.closest('.custom-audio-player');
                    if (otherPlayer) {
                        otherPlayer.classList.remove('audio-playing');
                        otherPlayer.querySelector('.audio-play-btn').innerHTML = playIcon;
                    }
                }
            });

            audio.play();
            player.classList.add('audio-playing');
            btn.innerHTML = pauseIcon;
        } else {
            audio.pause();
            player.classList.remove('audio-playing');
            btn.innerHTML = playIcon;
        }

        // Initialize progress events once
        if (!audio.dataset.initialized) {
            audio.ontimeupdate = () => this.updateAudioProgress(playerId);
            audio.onended = () => {
                player.classList.remove('audio-playing');
                btn.innerHTML = playIcon;
                player.querySelector('.audio-progress-bar').style.width = '0%';
                player.querySelector('.current-time').textContent = '0:00';
            };
            audio.onloadedmetadata = () => {
                player.querySelector('.duration').textContent = this.formatTime(audio.duration);
            };
            audio.dataset.initialized = 'true';
        }
    },

    updateAudioProgress: function (playerId) {
        const player = document.getElementById(playerId);
        const audio = player.querySelector('audio');
        const progressBar = player.querySelector('.audio-progress-bar');
        const currentTimeText = player.querySelector('.current-time');

        if (audio.duration) {
            const percent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = percent + '%';
            currentTimeText.textContent = this.formatTime(audio.currentTime);
        }
    },

    seekAudio: function (event, playerId) {
        const player = document.getElementById(playerId);
        const audio = player.querySelector('audio');
        const container = player.querySelector('.audio-progress-container');

        const rect = container.getBoundingClientRect();
        const pos = (event.clientX - rect.left) / rect.width;
        audio.currentTime = pos * audio.duration;
    },

    formatTime: function (seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }
};

window.MarkdownLoader = MarkdownLoader;

