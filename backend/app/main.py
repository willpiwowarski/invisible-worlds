from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from .schemas import Week
from .models import load_weeks

app = FastAPI(
    title="Invisible Worlds API",
    description="Human development timeline API",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "Invisible Worlds backend running"}


@app.get("/weeks", response_model=List[Week])
def get_weeks():
    return load_weeks()


@app.get("/weeks/{week_number}", response_model=Week)
def get_week(week_number: int):
    weeks = load_weeks()
    for week in weeks:
        if week.week_number == week_number:
            return week

    # FastAPI will auto-convert this to a 404 later
    return {"error": "Week not found"}
