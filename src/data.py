"""
Helper methods for loading data
"""

from fredapi import Fred
import os
from dotenv import load_dotenv
import pandas as pd
from enum import Enum

load_dotenv()
fred = Fred(api_key=os.getenv("FRED_API_KEY"))

class Frequency(Enum):
    Monthly = "MS"
    Yearly = "YS"

def get_data(freq: Frequency) -> pd.DataFrame:
    """
    Returns values of the average monthly or yearly rates of Federal Funds, 3-Month Treasuries,
    10-Year Treasuries, and 30-Year FRMs.

    Parameters
    ----------
    freq: Frequency
        The frequency of the returned data.

    Returns
    -------
    data: pd.DataFrame
        Time-indexed DataFrame of the interest rates. Missing monthly values are interpolated.
        The rate of each period is the average of all monthly rates within that period.
    """

    names_and_codes = [
        ("Federal Funds", "FEDFUNDS"),
        ("3-Month Treasury", "GS3M"),
        ("10-Year Treasury", "GS10"),
        ("30-Year FRM", "MORTGAGE30US")
    ]

    data = {}

    for name, code in names_and_codes:
        series = fred.get_series(code).interpolate("linear").resample(freq.value).mean()
        series.index = series.index.year

        data[name] = series

    return pd.DataFrame(data).dropna()

def difference_data(data: pd.DataFrame):
    """
    Returns a copy of the given data differenced by one year.

    Parameters
    ----------
    data: pd.DataFrame
        Time-indexed DataFrame of the interest rates. Missing monthly values are interpolated.
        The rate of each period is the average of all monthly rates within that period.

    Returns
    -------
    diff_data: pd.DataFrame
        Year-indexed DataFrame of differenced interest rates.
    """

    return data.diff(1).dropna().rename(lambda c: f"Δ {c}", axis="columns")