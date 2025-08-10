"""
Helper methods for loading data
"""

from fredapi import Fred
import os
from dotenv import load_dotenv
import pandas as pd

load_dotenv()
fred = Fred(api_key=os.getenv("FRED_API_KEY"))

def get_data():
    """
    Returns values of the average monthly rates of Federal Funds, 3-Month Treasuries,
    10-Year Treasuries, and 30-Year FRMs.

    Parameters
    ----------
    None

    Returns
    -------
    data: pd.DataFrame
        Year-indexed DataFrame of the interest rates. Missing monthly values are interpolated.
        The rate of each year is the average of all monthly rates.
    """

    names_and_codes = [
        ("Federal Funds", "FEDFUNDS"),
        ("3-Month Treasury", "GS3M"),
        ("10-Year Treasury", "GS10"),
        ("30-Year FRM", "MORTGAGE30US")
    ]

    data = {}

    for name, code in names_and_codes:
        series = fred.get_series(code).interpolate("linear").resample("YS").mean()
        series.index = series.index.year

        data[name] = series

    return pd.DataFrame(data).dropna()

def difference_data(data: pd.DataFrame):
    """
    Returns a copy of the given data differenced by one year.

    Parameters
    ----------
    data: pd.DataFrame
        Year-indexed DataFrame of the interest rates. Missing monthly values are interpolated.
        The rate of each year is the average of all monthly rates.

    Returns
    -------
    diff_data: pd.DataFrame
        Year-indexed DataFrame of differenced interest rates.
    """

    return data.diff(1).dropna().rename(lambda c: f"Δ {c}", axis="columns")