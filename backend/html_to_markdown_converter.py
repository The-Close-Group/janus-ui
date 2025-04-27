#!/usr/bin/env python3
import argparse
import logging
import re
import time
import urllib.parse
from collections import deque

import requests
from bs4 import BeautifulSoup
import html2text

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger(__name__)

class MarkdownCrawler:
    """A mini-crawler that converts HTML pages to Markdown and prints to console."""
    
    def __init__(
        self, 
        seed_url: str,
        max_links: int = 0, 
        timeout: int = 10
    ):
        self.seed_url = seed_url
        self.max_links = max_links  # Maximum number of links to process, 0 means only seed URL
        self.timeout = timeout
        self.user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        self.visited_urls = set()
        self.queue = deque([(seed_url, True)])  # (url, is_seed) - True if it's the seed URL
    
    def _clean_url(self, url: str) -> str:
        """Remove tracking parameters from URL."""
        # Simple query cleaning
        if '?' in url:
            base_url = url.split('?')[0]
            return base_url
        
        return url
    
    def _normalize_url(self, base_url: str, href: str) -> str:
        """Normalize relative URLs to absolute URLs."""
        if not href or href.startswith('#') or href.startswith('javascript:'):
            return None
            
        # Convert relative URLs to absolute
        abs_url = urllib.parse.urljoin(base_url, href)
        
        # Only keep https links
        if not abs_url.startswith('https://'):
            return None
            
        return self._clean_url(abs_url)
    
    def _extract_links(self, soup: BeautifulSoup, base_url: str) -> list:
        """Extract and normalize links from HTML."""
        links = []
        
        for anchor in soup.find_all('a', href=True):
            href = anchor.get('href', '')
            normalized_url = self._normalize_url(base_url, href)
            
            if normalized_url and normalized_url not in self.visited_urls:
                links.append(normalized_url)
        
        # Remove duplicates while preserving order
        unique_links = []
        seen = set()
        for link in links:
            if link not in seen:
                seen.add(link)
                unique_links.append(link)
        
        return unique_links
    
    def _clean_html(self, soup: BeautifulSoup) -> BeautifulSoup:
        """Clean HTML for better markdown conversion."""
        # Remove unnecessary elements
        for tag in ['script', 'style', 'iframe', 'noscript']:
            for element in soup.find_all(tag):
                if element:
                    element.decompose()
        
        return soup
    
    def _convert_to_markdown(self, html: str, url: str) -> str:
        """Convert HTML to clean Markdown."""
        soup = BeautifulSoup(html, 'html.parser')
        
        # Clean HTML before conversion
        clean_soup = self._clean_html(soup)
        
        # Configure HTML2Text
        h = html2text.HTML2Text()
        h.ignore_links = False
        h.ignore_images = False
        h.body_width = 0  # Don't wrap text
        h.unicode_snob = True  # Use Unicode instead of ASCII
        
        # Convert HTML to markdown
        markdown = h.handle(str(clean_soup))
        
        # Add source URL as HTML comment at the top
        markdown = f"<!-- {url} -->\n{markdown}"
        
        return markdown
    
    def _fetch_url(self, url: str) -> tuple:
        """Fetch a URL and extract HTML and links."""
        logger.info(f"Fetching: {url}")
        
        headers = {
            'User-Agent': self.user_agent,
            'Accept': 'text/html,application/xhtml+xml,application/xml',
        }
        
        try:
            response = requests.get(url, headers=headers, timeout=self.timeout)
            response.raise_for_status()
            
            # Simple check for HTML content
            content_type = response.headers.get('Content-Type', '')
            if not content_type.startswith('text/html'):
                logger.info(f"Skipping non-HTML content: {url}")
                return None, []
            
            logger.info(f"Successfully fetched {url} - Status: {response.status_code}, Size: {len(response.text)} bytes")
            
            soup = BeautifulSoup(response.text, 'html.parser')
            links = self._extract_links(soup, url)
            
            return response.text, links
            
        except Exception as e:
            logger.warning(f"Error fetching {url}: {e}")
            return None, []
    
    def crawl(self) -> None:
        """Start the crawling process."""
        link_count = 0  # Counter for additional links processed (not including seed)
        
        while self.queue:
            url, is_seed = self.queue.popleft()
            
            # Skip if already visited
            if url in self.visited_urls:
                continue
            
            self.visited_urls.add(url)
            
            # Add polite delay
            time.sleep(1)
            
            # Fetch URL
            html, links = self._fetch_url(url)
            
            if html:
                # Convert HTML to Markdown
                markdown = self._convert_to_markdown(html, url)
                
                # Print the markdown to console
                print("\n" + "=" * 80)
                print(f"MARKDOWN FOR URL: {url}")
                print("=" * 80)
                print(markdown)
                print("=" * 80 + "\n")
                
                # If this is the seed URL, queue up to max_links additional links
                if is_seed and self.max_links > 0:
                    for link in links:
                        if link_count >= self.max_links:
                            break
                            
                        if link not in self.visited_urls:
                            self.queue.append((link, False))  # Not a seed URL
                            link_count += 1
        
        print(f"Crawling complete. Processed {len(self.visited_urls)} URLs.")


def main():
    """Main entry point for the crawler."""
    parser = argparse.ArgumentParser(description='Convert web pages to markdown and print to console.')
    parser.add_argument('url', help='The seed URL to start crawling from')
    parser.add_argument('--max-links', type=int, default=0, help='Maximum number of additional links to process (default: 0)')
    parser.add_argument('--timeout', type=int, default=10, help='Request timeout in seconds')
    
    args = parser.parse_args()
    
    # Create crawler and start crawling
    crawler = MarkdownCrawler(
        seed_url=args.url,
        max_links=args.max_links,
        timeout=args.timeout
    )
    
    print(f"Starting crawler with seed URL: {args.url}")
    print(f"Maximum additional links: {args.max_links}")
    
    crawler.crawl()


if __name__ == "__main__":
    main() 