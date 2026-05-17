import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import edit, resume

_default_origins = "http://localhost:5173,http://localhost:3000"
_allowed = [
    o.strip()
    for o in os.getenv("ALLOWED_ORIGINS", _default_origins).split(",")
    if o.strip()
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(edit.router)
app.include_router(resume.router)


@app.get("/")
def root():
    return {"message": "Application is running..."}
