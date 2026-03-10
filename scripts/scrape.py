#!/usr/bin/env python3
import json
import sys
from scrapling.fetchers import Fetcher, StealthyFetcher

def main():
    if len(sys.argv) < 2:
        print(json.dumps({'success': False, 'error': 'No input provided'}))
        sys.exit(1)
    
    try:
        params = json.loads(sys.argv[1])
    except json.JSONDecodeError as e:
        print(json.dumps({'success': False, 'error': f'Invalid JSON: {e}'}))
        sys.exit(1)
    
    url = params.get('url', '')
    selector = params.get('selector', 'body')
    extract = params.get('extract', 'text')
    stealth = params.get('stealth', False)
    
    if not url:
        print(json.dumps({'success': False, 'error': 'URL is required'}))
        sys.exit(1)
    
    try:
        if stealth:
            page = StealthyFetcher.fetch(url, headless=True, network_idle=True)
        else:
            page = Fetcher.get(url, impersonate='chrome')
        
        result = {
            'url': url,
            'title': page.css('title::text').get() or '',
        }
        
        if extract == 'text':
            elements = page.css(selector)
            if len(elements) == 1:
                result['content'] = elements[0].text
            else:
                result['content'] = [el.text for el in elements]
        elif extract == 'html':
            elements = page.css(selector)
            if len(elements) == 1:
                result['content'] = elements[0].html_content
            else:
                result['content'] = [el.html_content for el in elements]
        elif extract == 'links':
            links = []
            for a in page.css('a'):
                href = a.attrib.get('href')
                if href:
                    links.append(href)
            result['links'] = links
        elif extract == 'markdown':
            main = page.css('main, article, .content, #content, body')
            if main:
                result['content'] = main[0].text
        
        # Get metadata
        result['metadata'] = {}
        for meta in page.css('meta'):
            name = meta.attrib.get('name') or meta.attrib.get('property')
            content = meta.attrib.get('content')
            if name and content:
                result['metadata'][name] = content
        
        print(json.dumps({'success': True, 'data': result}))
    except Exception as e:
        print(json.dumps({'success': False, 'error': str(e)}))

if __name__ == '__main__':
    main()
