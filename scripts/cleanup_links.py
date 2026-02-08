import re

def clean_slug(url):
    # Remove search.app wrap
    if 'search.app/?link=' in url:
        url = url.split('link=')[1].split('&')[0]
    
    # Extract last part of path
    path = url.strip('/').split('/')[-1]
    
    # Replace hyphens/underscores with spaces
    title = path.replace('-', ' ').replace('_', ' ')
    
    # Title case
    title = title.title()
    
    # Special cleanups
    title = title.replace('.Html', '').replace('.Php', '')
    
    return title

def process_file(filepath):
    with open(filepath, 'r') as f:
        lines = f.readlines()
    
    processed = []
    for line in lines:
        match = re.search(r'- \[Access Link\]\((.*?)\)', line)
        if match:
            url = match.group(1)
            title = clean_slug(url)
            processed.append(f"- [{title}]({url}) - Informational resource found at this URL.")
        else:
            processed.append(line.strip())
            
    return "\n".join(processed)

# Example usage for linux.md
# print(process_file('content/db/linux.md'))
