"""
Helper methods for loading data
"""

from fredapi import Fred
import os
from dotenv import load_dotenv
import pandas as pd

load_dotenv()
fred = Fred(api_key=os.getenv("FRED_API_KEY"))

def get_data() -> dict[str, pd.Series]:
    """
    Creates an object containing unprocessed series of Federal Funds, 3-month Treasury, 10-year
    Treasury, and 30-year FRM rates.

    Parameters
    ----------
    None

    Returns
    -------
    data_dict: dict[str, pd.Series]
        Map between a series' name and its time-indexed values.
    """

    names_and_codes = [
        ("Federal Funds", "FEDFUNDS"),
        ("3-Month Treasury", "GS3M"),
        ("10-Year Treasury", "GS10"),
        ("30-Year FRM", "MORTGAGE30US")
    ]

    data_dict = {}
    min_date = None

    for name, code in names_and_codes:
        series = fred.get_series(code).dropna()
        series_start_date = series.index.min()
        min_date = series_start_date if min_date is None else max(series_start_date, min_date)

        data_dict[name] = series

    return {
        name: series[series.index >= min_date]
        for name, series in data_dict.items()
    }

def clean_data(data_dict: dict[str, pd.Series]) -> pd.DataFrame:
    """
    Preprocesses a data_dict into a DataFrame indexed by year.

    Parameters
    ----------
    data_dict: dict[str, pd.Series]
        Map between a series' name and its time-indexed values.
    freq: Frequency
        The frequency of the returned data.

    Returns
    -------
    cleaned_data: pd.DataFrame
        Time-indexed DataFrame of the interest rates. Missing values are interpolated. The rate of
        each year is the average of all rates within that period.
    """

    all_series = []

    for name, series in data_dict.items():
        series = series.interpolate("linear").resample("YS").mean()
        series.index = series.index.year
        series.name = name

        all_series.append(series)

    cleaned_data = pd.concat(all_series, axis=1)

    return cleaned_data

def diff_data(data: pd.DataFrame):
    """
    Returns a copy of the given data differenced by one year.

    Parameters
    ----------
    data: pd.DataFrame
        Time-indexed DataFrame of the interest rates. Missing monthly values are interpolated.
        The rate of each period is the average of all monthly rates within that period.

    Returns
    -------
    diffed_data: pd.DataFrame
        Year-indexed DataFrame of differenced interest rates.
    """

    return data.diff(1).dropna().rename(lambda c: f"Δ {c}", axis="columns")