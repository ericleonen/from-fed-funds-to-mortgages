from fastapi import FastAPI
from fastapi.responses import JSONResponse
from helpers import get_plotting_data

app = FastAPI()

@app.get("/plotting_data")
def plot_data():
    data = get_plotting_data()
    return JSONResponse(content=data)
