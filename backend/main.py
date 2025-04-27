from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
import requests
from bs4 import BeautifulSoup
from typing import Optional
import logging
import json
import sys
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

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

class ScrapingResponse(BaseModel):
    url: str
    title: str
    description: Optional[str] = None
    html: str

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
        
        result = ScrapingResponse(
            url=str(request.url),
            title=title,
            description=description,
            html=response.text
        )
        
        logger.info(f"✅ Successfully processed URL")
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
        
        # Return the HTML directly
        logger.info(f"✅ Successfully processed URL")
        logger.info("="*50)
        return response.text
        
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