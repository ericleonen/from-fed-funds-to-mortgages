from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from helpers import get_plotting_data

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "https://ericleonen.github.io/from-fed-funds-to-mortgages", 
        "https://ericleonen.github.io/from-fed-funds-to-mortgages/"
    ],
    allow_methods=["GET"],
    allow_headers=["*"],
)

@app.get("/plotting_data")
def plot_data():
    data = get_plotting_data()
    return JSONResponse(content=data)
