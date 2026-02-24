import os
import re
import json

SOURCES = [
    "/home/irfanmahir/My Web Sites/urls_and_names_pure.md",
    "/home/irfanmahir/My Web Sites/whatsapp_urls.txt",
    "/home/irfanmahir/My Web Sites/resolved_search_app_urls.txt"
]

OUTPUT_DIR = "/home/irfanmahir/My Web Sites/content/db"

# CATEGORIES to update
NEW_HUBS = ["rust", "golang", "c_cpp", "ai-ml", "cybersecurity", "design", "learning", "apis"]

CATEGORIES = {
    "rust": [r"\brust\b", r"\bcargo\b", "wasm"],
    "golang": [r"\bgo\s", r"\bgolang\b"],
    "c_cpp": [r"\bc\+\+\b", r"\bcpp\b", "obj-c", "clang", r"\bgcc\b", r"\bc-programming\b"],
    "ai-ml": [r"\bai\b", r"\bml\b", "machine learning", "deep learning", "llm", "gemini", "gpt", "openai", "claude", "llama", "model", "neural"],
    "cybersecurity": ["security", r"\bhack\b", "exploit", "pentest", "vulnerability", "malware", r"\bcyber\b", "firewall", "bypass", r"\battack\b", "ctf", "kali"],
    "design": ["design", r"\bicon\b", r"\bfont\b", "color", "photo", "illustration", r"\bsvg\b", r"\bui\b", r"\bux\b", "figma", "dribbble", "behance"],
    "learning": ["course", "tutorial", r"\blearn\b", "interview", r"\bbook\b", "career", "job", "scholarship", "university", "youtube", "podcast"],
    "apis": ["api", "rest", "graphql", "json", "endpoint", "swagger", "postman"]
}

# Sub-category keywords
SUB_CATEGORIES = {
    "Tutorials & Courses": ["course", "tutorial", "learn", "academy", "guide", "handbook"],
    "Tools & Frameworks": ["tool", "framework", "library", "sdk", "engine", "kit", "cli"],
    "Platforms & Portals": ["platform", "portal", "hub", "network", "community", "forum"],
    "Resources & Collections": ["resource", "collection", "list", r"\bawesome\b", "database", "archive"],
    "News & Articles": ["news", "article", "blog", "paper", "newsletter", "update"],
    "Core & Systems": ["core", "system", "kernel", "compiler", "runtime", "engine"]
}

def clean_title(title, url):
    """Refine title to be descriptive and long if possible."""
    # If title is just a video ID or CMS ID, try to get something better from URL
    is_generic = not title or title.strip() == "" or \
                 re.match(r'^(Watch\?V=|Ugkx|11|12)\w+$', title, re.I) or \
                 title.lower() in ["access link", "click here", "link", "here"]
    
    if is_generic:
        # Try to extract from URL
        parsed_url = url.split('/')
        if 'youtube.com' in url or 'youtu.be' in url:
            title = "YouTube Video: " + url.split('v=')[-1].split('&')[0] if 'v=' in url else "YouTube Resource"
        else:
            path = parsed_url[-1] if parsed_url[-1] else parsed_url[-2]
            title = path.replace('-', ' ').replace('_', ' ').title()
            # Remove common extensions and parameters
            title = re.sub(r'\.(html|htm|pdf|md|php).*$', '', title, flags=re.I)
            title = re.sub(r'\?.*$', '', title)
    
    # Clean up common junk
    title = title.replace('web.archive.org', '').replace('web/202', '')
    title = title.strip()
    
    # If still too short or looks like a filename, use domain
    if len(title) < 4 or re.match(r'^\d+\.Cms$', title, re.I):
        domain = url.split('//')[-1].split('/')[0].replace('www.', '')
        title = f"{domain.capitalize()} Resource"
    
    return title

def extract_links(file_path):
    links = []
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        md_links = re.findall(r'\[(.*?)\]\((https?://[^\s)\]]+)\)', content)
        for title, url in md_links:
            links.append({"title": title, "url": url})
        
        raw_urls = re.findall(r'https?://[^\s)\]]+', content)
        md_urls = {l["url"] for l in links}
        for url in raw_urls:
            if url not in md_urls:
                links.append({"title": "", "url": url})
    return links

def categorize_link(link):
    text = (link["title"] + " " + link["url"]).lower()
    for cat, keywords in CATEGORIES.items():
        for kw in keywords:
            if (kw.startswith(r"\b") or kw.endswith(r"\b")) and re.search(kw, text):
                return cat
            elif kw in text:
                return cat
    return "other"

def sub_categorize(link):
    text = (link["title"] + " " + link["url"]).lower()
    for sub, keywords in SUB_CATEGORIES.items():
        for kw in keywords:
            if (kw.startswith(r"\b") or kw.endswith(r"\b")) and re.search(kw, text):
                return sub
            elif kw in text:
                return sub
    return "General Resources"

def process():
    all_links = []
    seen_urls = set()
    
    for source in SOURCES:
        if os.path.exists(source):
            print(f"Processing {source}...")
            links = extract_links(source)
            for l in links:
                if l["url"] not in seen_urls:
                    all_links.append(l)
                    seen_urls.add(l["url"])
    
    categorized = {cat: [] for cat in CATEGORIES}
    
    for l in all_links:
        cat = categorize_link(l)
        if cat in NEW_HUBS:
            l["title"] = clean_title(l["title"], l["url"])
            l["sub_cat"] = sub_categorize(l)
            categorized[cat].append(l)
        
    for cat in NEW_HUBS:
        links = categorized[cat]
        if not links: continue
        
        file_name = f"{cat.replace('_', '-')}.md"
        file_path = os.path.join(OUTPUT_DIR, file_name)
        
        # Preserve header if exists
        header = f"# {cat.replace('_', ' ').title()} Resources\n\nExpertly curated links and tools for modern development.\n"
        if os.path.exists(file_path):
            with open(file_path, 'r') as f:
                content = f.read()
                header_match = re.match(r"(# .*?\n.*?\n)", content, re.S)
                if header_match:
                    header = header_match.group(1)
        
        # Group by sub-category
        sections = {}
        for l in links:
            sub = l["sub_cat"]
            if sub not in sections: sections[sub] = []
            sections[sub].append(l)
            
        print(f"Writing {len(links)} links to {file_path}...")
        
        with open(file_path, 'w') as f:
            f.write(header)
            # Priorities sub-categories
            order = ["Core & Systems", "Tools & Frameworks", "Tutorials & Courses", "Resources & Collections", "Platforms & Portals", "News & Articles", "General Resources"]
            for sub in order:
                if sub in sections:
                    f.write(f"\n## {sub}\n\n")
                    # Sort links by title
                    sections[sub].sort(key=lambda x: x["title"].lower())
                    for l in sections[sub]:
                        f.write(f"- [{l['title']}]({l['url']})\n")

if __name__ == "__main__":
    process()
