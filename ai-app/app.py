from fastapi import FastAPI
from routes import edit, resume

app = FastAPI()

app.include_router(edit.router)
app.include_router(resume.router)


@app.get("/")
def root():
    return {"message": "Application is running..."}
