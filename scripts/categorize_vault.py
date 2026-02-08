import re

def clean_slug(url):
    if 'search.app/?link=' in url:
        url = url.split('link=')[1].split('&')[0]
    elif 'search.app/' in url:
        return "Search Resource"
        
    path = url.strip('/').split('/')[-1]
    title = path.replace('-', ' ').replace('_', ' ').replace('.html', '').replace('.php', '')
    title = title.title()
    
    # Clean up common garbage
    title = re.sub(r'\?.*', '', title)
    title = re.sub(r'#.*', '', title)
    
    if len(title) < 3:
        # Fallback to domain
        domain = url.split('//')[-1].split('/')[0]
        title = domain.replace('www.', '').split('.')[0].title()
        
    return title

def categorize(title, url):
    title_lower = title.lower()
    url_lower = url.lower()
    
    if any(kw in title_lower or kw in url_lower for kw in ['icon', 'font', 'color', 'design', 'css', 'style', 'background', 'gradient', 'asset']):
        return "Design & Assets"
    if any(kw in title_lower or kw in url_lower for kw in ['github', 'tool', 'dev', 'code', 'api', 'library', 'framework', 'repo', 'script', 'programming', 'vscode', 'jetbrains']):
        return "Development Tools"
    if any(kw in title_lower or kw in url_lower for kw in ['blog', 'news', 'article', 'tutorial', 'learn', 'guide', 'youtube', 'medium', 'dev.to']):
        return "Articles & Learning"
    if any(kw in title_lower or kw in url_lower for kw in ['productivity', 'work', 'cloud', 'host', 'manage', 'auth', 'email', 'form']):
        return "Workflow & Productivity"
        
    return "Miscellaneous archive"

def process_vault(filepath):
    with open(filepath, 'r') as f:
        lines = f.readlines()
    
    categories = {
        "Design & Assets": [],
        "Development Tools": [],
        "Articles & Learning": [],
        "Workflow & Productivity": [],
        "Miscellaneous archive": []
    }
    
    for line in lines:
        line = line.strip()
        if not line.startswith('- ['):
            continue
            
        match = re.search(r'\[(.*?)\]\((.*?)\)', line)
        if match:
            original_title = match.group(1)
            url = match.group(2)
            
            if original_title == "Access Link" or original_title.startswith('http'):
                final_title = clean_slug(url)
            else:
                final_title = original_title
                
            cat = categorize(final_title, url)
            categories[cat].append(f"- [{final_title}]({url})")
            
    header = "# Master Vault\n\nA massive collection of unsorted technical resources, web tools, and archival links.\n\n"
    output = header
    
    for cat, links in categories.items():
        if links:
            output += f"## {cat}\n"
            output += "\n".join(links) + "\n\n"
            
    return output

if __name__ == "__main__":
    import sys
    res = process_vault('/home/irfanmahir/My Web Sites/content/db/other.md')
    with open('/home/irfanmahir/My Web Sites/content/db/other.md', 'w') as f:
        f.write(res)
    print("Vault reorganized successfully.")
