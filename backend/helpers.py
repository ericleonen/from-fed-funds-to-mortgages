"""
Helpers to load, preprocess, and deliver data
"""

from fredapi import Fred
import os
from dotenv import load_dotenv
import pandas as pd
import numpy as np

load_dotenv()
fred = Fred(api_key=os.getenv("FRED_API_KEY"))

def get_plotting_data() -> dict:
    """
    Returns a JSON-ready object for plotting in the frontend.

    Parameters
    ----------
    None

    Returns
    -------
    data: dict
        Object including recent data, scatter plot data, and regression line coefficients.
    }
    """

    names_and_codes = [
        ("FFR", "FEDFUNDS"),
        ("STR", "GS3M"),
        ("LTR", "GS10"),
        ("FRM", "MORTGAGE30US")
    ]

    data_dict = {}
    min_date = None
    last_updated_date = None

    last_values = {}

    for name, code in names_and_codes:
        series = fred.get_series(code).dropna()
        updated_date = fred.get_series_info(code)["last_updated"]

        last_updated_date = updated_date if last_updated_date is None else max(last_updated_date, updated_date)

        series_start_date = series.index.min()
        min_date = series_start_date if min_date is None else max(series_start_date, min_date)

        data_dict[name] = series
        last_values[name] = series.iloc[-1]

    data_dict = {
        name: series[series.index >= min_date].interpolate("linear").resample("YS").mean()
        for name, series in data_dict.items()
    }

    data = pd.DataFrame(data_dict).diff(1).dropna().rename(lambda c: f"Δ{c}", axis="columns")

    def get_coefs(x: list, y: list):
        x = np.array(x)
        y = np.array(y)

        x_mean = x.mean()
        y_mean = y.mean()

        beta_1 = np.sum((x - x_mean) * (y - y_mean)) / np.sum((x - x_mean)**2)
        beta_0 = y_mean - beta_1 * x_mean

        return [beta_0, beta_1]
    
    delta_ffr_list = data["ΔFFR"].to_list()
    delta_str_list = data["ΔSTR"].to_list()
    delta_ltr_list = data["ΔLTR"].to_list()
    delta_frm_list = data["ΔFRM"].to_list()

    return {
        "lastUpdatedDate": last_updated_date,
        "lastFFR": last_values["FFR"],
        "lastSTR": last_values["STR"],
        "lastLTR": last_values["LTR"],
        "lastFRM": last_values["FRM"],
        "deltaFFR": delta_ffr_list,
        "deltaSTR": delta_str_list,
        "deltaLTR": delta_ltr_list,
        "deltaFRM": delta_frm_list,
        "coefs1": get_coefs(delta_ffr_list, delta_str_list),
        "coefs2": get_coefs(delta_str_list, delta_ltr_list),
        "coefs3": get_coefs(delta_ltr_list, delta_frm_list)
    }