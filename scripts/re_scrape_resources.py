import os
import re
from bs4 import BeautifulSoup

def clean_url(url):
    """Remove HTTrack and Wayback artifacts from URLs."""
    if not url: return '#'
    
    # HTTrack external link wrapper
    if 'external.html?link=' in url:
        url = url.split('external.html?link=')[-1]
    
    # Wayback Machine prefix removal
    # Pattern: /web/TIMESTAMP/URL
    wb_match = re.search(r'/web/\d+/(http.*)', url)
    if wb_match:
        url = wb_match.group(1)
    
    # HTTrack relative path cleanup for what should be absolute
    if url.startswith('../../../../../'):
        # This usually happens with Wayback/HTTrack relative jumps
        # If it contains a protocol later, it's an absolute link that got messed up
        pass

    # Basic cleanup
    url = url.replace('https_/', 'https://').replace('http_/', 'http://')
    
    # Remove trailing HTTrack indicators like /index.html if they were mapped
    url = url.replace('/index.html', '')
    
    return url

def scrape_hub(html_path, output_md):
    print(f"Scraping {html_path} -> {output_md}")
    if not os.path.exists(html_path):
        print(f"Error: {html_path} not found")
        return
    with open(html_path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')

    # Find the main container
    prose = soup.find('div', class_='prose') or soup.find('main') or soup.body
    
    title = soup.title.string.replace(' - Made by 0x3d.site', '').split('-')[0].strip()
    md_content = f"# {title}\n\n"
    
    # 1. Extract main description (paragraphs after H1 but before first H2 or list)
    h1 = prose.find('h1')
    if h1:
        for sibling in h1.next_siblings:
            if sibling.name in ['h2', 'ul', 'div']: break
            if sibling.name == 'p':
                text = sibling.get_text(strip=True)
                if text and "Main website:" not in text:
                    md_content += text + "\n"
        md_content += "\n"

    # 2. Process all categories and lists
    # We look for all headers (H2/H3) and the lists that follow them
    headers = prose.find_all(['h2', 'h3'])
    for h in headers:
        name = h.get_text(strip=True)
        if name in ["Contents", "Contents", "Contributing", "Index"]: continue
        
        # Determine level for Markdown
        level = "##" if h.name == "h2" else "###"
        md_content += f"{level} {name}\n\n"
        
        # Look for description and lists until the next header
        for sibling in h.next_siblings:
            if sibling.name in ['h2', 'h3']: break
            
            if sibling.name == 'p':
                text = sibling.get_text(strip=True)
                if text and "Awesome-Nim logo" not in text:
                    md_content += text + "\n\n"
            
            elif sibling.name == 'ul':
                for li in sibling.find_all('li', recursive=False):
                    a = li.find('a')
                    if not a:
                        # Handle nested headers within lists
                        sub_text = "".join([str(c) for c in li.contents if isinstance(c, str)]).strip()
                        if sub_text: md_content += f"### {sub_text}\n\n"
                        continue
                    
                    item_name = a.get_text(strip=True)
                    item_url = clean_url(a.get('href', '#'))
                    
                    # Extract description from text following <a>
                    item_desc = ""
                    found_a = False
                    for content in li.contents:
                        if content == a:
                            found_a = True
                            continue
                        if found_a and isinstance(content, str):
                            item_desc += str(content)
                        elif found_a and hasattr(content, 'name') and content.name == 'ul':
                            break
                    
                    item_desc = item_desc.strip()
                    if item_desc.startswith('- '): item_desc = item_desc[2:].strip()
                    if item_desc.startswith(':'): item_desc = item_desc[1:].strip()
                    
                    md_content += f"- [{item_name}]({item_url}) - {item_desc}\n"
                    
                    # Handle sub-lists (nested resources)
                    sub_ul = li.find('ul')
                    if sub_ul:
                        for sub_li in sub_ul.find_all('li'):
                            sub_a = sub_li.find('a')
                            if sub_a:
                                s_name = sub_a.get_text(strip=True)
                                s_url = clean_url(sub_a.get('href', '#'))
                                s_desc = "".join([str(c) for c in sub_li.contents if isinstance(c, str)]).strip()
                                if s_desc.startswith('- '): s_desc = s_desc[2:].strip()
                                md_content += f"    - [{s_name}]({s_url}) - {s_desc}\n"
                md_content += "\n"

    with open(output_md, 'w', encoding='utf-8') as f:
        f.write(md_content)

def scrape_apis(html_path, output_md):
    print(f"Scraping APIs {html_path} -> {output_md}")
    if not os.path.exists(html_path):
        return

    with open(html_path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')

    md_content = "# Public APIs\n\nA curated list of public APIs for developers.\n\n"

    # For APIs it's <h3> followed by <table>
    for h3 in soup.find_all('h3'):
        name = h3.get_text(strip=True)
        if name == "Index": continue
        
        md_content += f"## {name}\n\n"
        
        table = h3.find_next_sibling('table')
        if table:
            tbody = table.find('tbody')
            if tbody:
                for tr in tbody.find_all('tr'):
                    tds = tr.find_all('td')
                    if len(tds) >= 2:
                        a = tds[0].find('a')
                        if a:
                            item_name = a.get_text(strip=True)
                            item_url = clean_url(a.get('href', '#'))
                            item_desc = tds[1].get_text(strip=True)
                            md_content += f"- [{item_name}]({item_url}) - {item_desc}\n"
        md_content += "\n"

    with open(output_md, 'w', encoding='utf-8') as f:
        f.write(md_content)

if __name__ == "__main__":
    base = "/home/irfanmahir/My Web Sites/_OLD_SITE_BACKUP"
    
    # Python
    scrape_hub(f"{base}/Py/web.archive.org/web/20250716143901/https_/python.0x3d.site/index.html", "content/db/python.md")
    
    # JS
    scrape_hub(f"{base}/Py/web.archive.org/web/20250619222808/https_/javascript.0x3d.site/index.html", "content/db/js.md")
    
    # APIs
    scrape_apis(f"{base}/0x3d_new_extracted/web.archive.org/web/20250902121700/https_/0x3d.site/public-apis.html", "content/db/apis.md")
    
    # Nim
    scrape_hub(f"{base}/Py/web.archive.org/web/20250227201716/https_/nim.0x3d.site/index.html", "content/db/nim.md")
    
    print("Scraping complete!")
