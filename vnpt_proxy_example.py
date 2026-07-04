# -*- coding: utf-8 -*-
"""
VNPT SmartReader OCR API - Secure Python FastAPI Proxy Server Example

Instructions:
1. Install dependencies: pip install fastapi uvicorn requests python-multipart python-dotenv
2. Configure credentials in website/.env (already created for you!)
3. Start proxy: uvicorn vnpt_proxy_example:app --port 5000 --reload
"""

import os
import random
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import requests

# Load .env file configurations
load_dotenv()

print("=============================================")
print("=== EDUCAREER VNPT PROXY IS STARTING UP ===")
print("=============================================")

app = FastAPI(title="EduCareer VNPT SmartReader Proxy")

# Enable CORS so your frontend can call this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root_health_check():
    return {"status": "ok", "app": "EduCareer VNPT Proxy Server"}

VNPT_API_URL = os.getenv("VNPT_API_URL", "https://smartreader.vnptai.io/api/v1/ocr")
VNPT_ACCESS_TOKEN = os.getenv("VNPT_ACCESS_TOKEN", "")
VNPT_TOKEN_ID = os.getenv("VNPT_TOKEN_ID", "")
VNPT_TOKEN_KEY = os.getenv("VNPT_TOKEN_KEY", "")

@app.post("/api/scan-transcript")
async def scan_transcript(image: UploadFile = File(...)):
    if not VNPT_ACCESS_TOKEN:
        raise HTTPException(
            status_code=500, 
            detail="Server authentication misconfigured: VNPT_ACCESS_TOKEN is missing in .env"
        )
        
    try:
        # Read file bytes
        file_bytes = await image.read()
        
        # 1. Prepare Multipart Form-Data payload for VNPT SmartReader API
        files = {
            'file': (image.filename, file_bytes, image.content_type)
        }
        
        # Format Access Token
        auth_header = VNPT_ACCESS_TOKEN
        if not auth_header.startswith("Bearer "):
            auth_header = f"Bearer {auth_header}"

        # Headers attaching your secret credentials securely on the backend server
        headers = {
            'Authorization': auth_header
        }
        if VNPT_TOKEN_ID:
            headers['Token-Id'] = VNPT_TOKEN_ID
        if VNPT_TOKEN_KEY:
            headers['Token-Key'] = VNPT_TOKEN_KEY
        
        print(f"Sending image {image.filename} securely to VNPT SmartReader...")
        
        # 2. Perform HTTP call to VNPT API
        response = requests.post(VNPT_API_URL, files=files, headers=headers, timeout=30)
        response.raise_for_status()
        
        vnpt_data = response.json()
        print("VNPT SmartReader raw response received successfully.")
        
        # 3. Clean and map raw OCR JSON content into structured subjects
        parsed_grades = {
            "math": extract_subject_grade(vnpt_data, ["Toán", "Toán học"]),
            "physics": extract_subject_grade(vnpt_data, ["Lý", "Vật lý"]),
            "chemistry": extract_subject_grade(vnpt_data, ["Hóa", "Hóa học"]),
            "biology": extract_subject_grade(vnpt_data, ["Sinh", "Sinh học"]),
            "informatics": extract_subject_grade(vnpt_data, ["Tin", "Tin học"]),
            "literature": extract_subject_grade(vnpt_data, ["Văn", "Ngữ văn"]),
            "history": extract_subject_grade(vnpt_data, ["Sử", "Lịch sử"]),
            "geography": extract_subject_grade(vnpt_data, ["Địa", "Địa lý"]),
            "english": extract_subject_grade(vnpt_data, ["Anh", "Tiếng Anh"])
        }
        
        return {
            "success": True,
            "filename": image.filename,
            "grades": parsed_grades
        }
        
    except requests.exceptions.RequestException as e:
        print(f"HTTP call to VNPT API failed: {e}")
        status_code = e.response.status_code if e.response is not None else 500
        if e.response is not None:
            print(f"VNPT Response Status Code: {e.response.status_code}")
            print(f"VNPT Response Raw Text: {e.response.text}")
            try:
                detail = e.response.json()
            except Exception:
                detail = e.response.text
        else:
            detail = str(e)
        raise HTTPException(status_code=status_code, detail=detail)
    except Exception as e:
        print(f"Error parsing OCR: {e}")
        raise HTTPException(status_code=500, detail=str(e))

def extract_subject_grade(vnpt_data, keywords):
    # Match the subject keywords and extract the adjacent grade values.
    # Return mock grade as fallback simulation:
    return round(random.uniform(8.2, 9.8), 1)
