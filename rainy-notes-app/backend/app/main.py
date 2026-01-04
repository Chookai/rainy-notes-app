from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import notes, tags

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Rainy Forest Notes API",
    description="A peaceful note-taking API with forest vibes",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(notes.router, prefix="/api/notes", tags=["notes"])
app.include_router(tags.router, prefix="/api/tags", tags=["tags"])


@app.get("/")
async def root():
    return {
        "message": "Welcome to Rainy Forest Notes API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
