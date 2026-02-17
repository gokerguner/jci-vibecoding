from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.routers import generate

load_dotenv()

app = FastAPI(
    title="AI Karakter Oluşturucu API",
    description="JCI & LÖSEV Sosyal Sorumluluk Projesi",
    version="1.0.0"
)

# CORS ayarları - Frontend'in backend'e erişimi için
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router'ları ekle
app.include_router(generate.router, prefix="/api", tags=["generate"])


@app.get("/")
async def root():
    return {
        "message": "AI Karakter Oluşturucu API",
        "docs": "/docs",
        "status": "running"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
