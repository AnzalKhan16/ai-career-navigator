from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from pydantic import BaseModel, Field
from typing import List
import PyPDF2
import io
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Career Navigator - AI Service")

# Pydantic models for the structured response
class WeeklyPlan(BaseModel):
    week: int
    focus: str
    activities: List[str]

class RoadmapResponse(BaseModel):
    readinessScore: int = Field(..., description="Score from 0 to 100")
    currentSkills: List[str]
    requiredSkills: List[str]
    skillsGap: List[str]
    roadmap: List[WeeklyPlan]

@app.post("/api/analyze-resume", response_model=RoadmapResponse)
async def analyze_resume(
    target_role: str = Form(..., description="Target role (e.g., SDE, AI/ML, DevOps, DS)"),
    file: UploadFile = File(...)
):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    # Extract text using PyPDF2
    try:
        contents = await file.read()
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(contents))
        extracted_text = ""
        for page in pdf_reader.pages:
            text = page.extract_text()
            if text:
                extracted_text += text
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading PDF: {str(e)}")

    if not extracted_text.strip():
        raise HTTPException(status_code=400, detail="Could not extract text from the provided PDF")

    # Mock Google Gemini API Integration
    # In a real scenario, we would send `extracted_text` and `target_role` to Gemini
    # and instruct it to return JSON matching the RoadmapResponse schema.
    
    # Mocking the response based on the requirements
    mock_response = RoadmapResponse(
        readinessScore=65,
        currentSkills=["Python", "SQL", "Git", "Basic Programming"],
        requiredSkills=["Advanced System Design", "Cloud Platforms (AWS/GCP)", "CI/CD", f"Specific {target_role} frameworks"],
        skillsGap=["Cloud Platforms", "CI/CD Pipelines", "Large Scale System Design"],
        roadmap=[
            WeeklyPlan(
                week=1,
                focus=f"Foundations for {target_role}",
                activities=["Review core concepts", "Set up development environment", "Take a preliminary assessment"]
            ),
            WeeklyPlan(
                week=2,
                focus="Closing the Skills Gap (Part 1)",
                activities=["Study missing core technologies", "Complete mini-projects", "Read official documentation"]
            ),
            WeeklyPlan(
                week=3,
                focus="Closing the Skills Gap (Part 2)",
                activities=["Advanced tutorials", "Contribute to open source", "Build a portfolio project"]
            ),
            WeeklyPlan(
                week=4,
                focus="Interview Preparation",
                activities=["Mock interviews", "Resume review", "System design practice"]
            )
        ]
    )

    return mock_response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
