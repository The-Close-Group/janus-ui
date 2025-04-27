from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
import requests
from bs4 import BeautifulSoup
from typing import Optional, List, Dict
import logging
import json
import sys
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
import time
import urllib.parse
from collections import deque

# Configure logging with more detailed format
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler(sys.stdout)  # Ensure logs go to stdout
    ]
)
logger = logging.getLogger(__name__)

app = FastAPI()

# CORS configuration with error handling
origins = [
    "http://localhost:5173",
    "http://localhost:8081", 
    "http://localhost:8080",
    "http://localhost:3000",
    "http://localhost:3002",  # Add Vite dev server port
    "http://localhost:3003",  # Add the new frontend port
    # Add any other origins you need
]

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600,  # Cache preflight requests for 1 hour
)

# Error handling middleware
class ErrorHandlerMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        try:
            response = await call_next(request)
            return response
        except Exception as e:
            logger.exception("An error occurred while processing the request")
            return JSONResponse(
                status_code=500,
                content={"detail": "Internal server error", "error": str(e)}
            )

app.add_middleware(ErrorHandlerMiddleware)

class WebsiteRequest(BaseModel):
    url: HttpUrl

class RelatedPage(BaseModel):
    url: str
    title: str
    markdown: str

class ScrapingResponse(BaseModel):
    url: str
    title: str
    description: Optional[str] = None
    html: str
    markdown: str  # Added field for markdown content
    related_pages: List[RelatedPage] = []  # Added field for related pages

class MarkdownConverter:
    """A utility to convert HTML to Markdown and find related pages."""
    
    def __init__(self, max_related_pages: int = 10):
        self.max_related_pages = max_related_pages
        self.user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        self.visited_urls = set()
    
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
        if not abs_url.startswith(('https://', 'http://')):
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
        # Import html2text here to avoid circular imports
        import html2text
        
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
        logger.info(f"Fetching related page: {url}")
        
        headers = {
            'User-Agent': self.user_agent,
            'Accept': 'text/html,application/xhtml+xml,application/xml',
        }
        
        try:
            # Make sure URL is valid
            if not url.startswith(('http://', 'https://')):
                url = 'https://' + url
                
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
            
            # Simple check for HTML content
            content_type = response.headers.get('Content-Type', '')
            if not content_type.startswith('text/html'):
                logger.info(f"Skipping non-HTML content: {url}")
                return None, None, []
            
            logger.info(f"Successfully fetched related page - Status: {response.status_code}")
            
            soup = BeautifulSoup(response.text, 'html.parser')
            links = self._extract_links(soup, url)
            
            # Extract title
            title = soup.title.string if soup.title else "No Title"
            
            return response.text, title, links
            
        except Exception as e:
            logger.warning(f"Error fetching related page {url}: {e}")
            return None, None, []
    
    def process(self, html: str, seed_url: str) -> Dict:
        """Process HTML from seed URL and collect related pages."""
        self.visited_urls = set([seed_url])
        related_pages = []
        
        # First, convert the seed page to markdown
        seed_markdown = self._convert_to_markdown(html, seed_url)
        seed_soup = BeautifulSoup(html, 'html.parser')
        
        # Extract links from the seed page
        links = self._extract_links(seed_soup, seed_url)
        
        # Process up to max_related_pages related pages
        link_count = 0
        for link in links:
            if link_count >= self.max_related_pages:
                break
                
            # Add polite delay to avoid overloading the server
            time.sleep(1)
            
            related_html, related_title, _ = self._fetch_url(link)
            if related_html:
                related_markdown = self._convert_to_markdown(related_html, link)
                related_pages.append({
                    "url": link,
                    "title": related_title,
                    "markdown": related_markdown
                })
                link_count += 1
                self.visited_urls.add(link)
        
        return {
            "markdown": seed_markdown,
            "related_pages": related_pages
        }

@app.post("/scrape", response_model=ScrapingResponse)
async def scrape_website(request: WebsiteRequest):
    logger.info("="*50)
    logger.info(f"🌐 New scraping request received")
    logger.info(f"📍 URL to scrape: {request.url}")
    
    try:
        # Add headers to mimic a browser request
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        logger.info(f"📤 Making request with headers: {json.dumps(headers)}")
        
        # Make the request
        response = requests.get(str(request.url), headers=headers, timeout=10)
        response.raise_for_status()
        
        logger.info(f"📥 Response received - Status: {response.status_code}")
        logger.info(f"📦 Response size: {len(response.text)} bytes")
        
        # Parse the HTML
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract metadata
        title = soup.title.string if soup.title else ""
        description = soup.find('meta', {'name': 'description'})
        description = description.get('content') if description else None
        
        logger.info(f"📝 Extracted metadata:")
        logger.info(f"   - Title: {title[:50]}...")
        logger.info(f"   - Description: {description[:50] if description else 'None'}...")
        
        # Process HTML to markdown and find related pages
        logger.info(f"🔄 Converting HTML to markdown and processing related pages...")
        markdown_converter = MarkdownConverter(max_related_pages=10)
        markdown_result = markdown_converter.process(response.text, str(request.url))
        
        # Create related pages list
        related_pages = [
            RelatedPage(url=page["url"], title=page["title"], markdown=page["markdown"])
            for page in markdown_result["related_pages"]
        ]
        
        logger.info(f"✅ Successfully processed URL and {len(related_pages)} related pages")
        
        result = ScrapingResponse(
            url=str(request.url),
            title=title,
            description=description,
            html=response.text,
            markdown=markdown_result["markdown"],
            related_pages=related_pages
        )
        
        logger.info("="*50)
        return result
        
    except requests.RequestException as e:
        logger.error(f"❌ Request error while scraping {request.url}")
        logger.error(f"Error details: {str(e)}")
        logger.info("="*50)
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        logger.error(f"❌ Unexpected error while scraping {request.url}")
        logger.error(f"Error type: {type(e).__name__}")
        logger.error(f"Error details: {str(e)}")
        logger.info("="*50)
        raise HTTPException(status_code=500, detail="An unexpected error occurred")

@app.get("/scrape")
async def scrape_website_get(url: str):
    logger.info("="*50)
    logger.info(f"🌐 New GET scraping request received")
    logger.info(f"📍 URL to scrape: {url}")
    
    try:
        # Add headers to mimic a browser request
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        logger.info(f"📤 Making request with headers: {json.dumps(headers)}")
        
        # Make sure URL is valid
        if not url.startswith(('http://', 'https://')):
            url = 'https://' + url
        
        # Make the request
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        logger.info(f"📥 Response received - Status: {response.status_code}")
        logger.info(f"📦 Response size: {len(response.text)} bytes")
        
        # Parse the HTML for metadata
        soup = BeautifulSoup(response.text, 'html.parser')
        title = soup.title.string if soup.title else ""
        description = soup.find('meta', {'name': 'description'})
        description = description.get('content') if description else None
        
        logger.info(f"📝 Extracted metadata:")
        logger.info(f"   - Title: {title[:50]}...")
        logger.info(f"   - Description: {description[:50] if description else 'None'}...")
        
        # Process HTML to markdown and find related pages
        logger.info(f"🔄 Converting HTML to markdown and processing related pages...")
        markdown_converter = MarkdownConverter(max_related_pages=10)
        markdown_result = markdown_converter.process(response.text, url)
        
        # Create related pages data
        related_pages_data = [
            {
                "url": page["url"],
                "title": page["title"],
                "markdown": page["markdown"]
            }
            for page in markdown_result["related_pages"]
        ]
        
        logger.info(f"✅ Successfully processed URL and {len(related_pages_data)} related pages")
        
        # Create a full response with markdown and related pages
        result = {
            "url": url,
            "title": title,
            "description": description,
            "html": response.text,
            "markdown": markdown_result["markdown"],
            "related_pages": related_pages_data
        }
        
        logger.info("="*50)
        return result
        
    except requests.RequestException as e:
        logger.error(f"❌ Request error while scraping {url}")
        logger.error(f"Error details: {str(e)}")
        logger.info("="*50)
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        logger.error(f"❌ Unexpected error while scraping {url}")
        logger.error(f"Error type: {type(e).__name__}")
        logger.error(f"Error details: {str(e)}")
        logger.info("="*50)
        raise HTTPException(status_code=500, detail="An unexpected error occurred")

if __name__ == "__main__":
    import uvicorn
    logger.info("🚀 Starting server...")
    uvicorn.run(app, host="0.0.0.0", port=4000) 