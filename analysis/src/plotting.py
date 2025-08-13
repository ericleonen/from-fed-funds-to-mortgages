"""
Helper methods for making and saving paper-ready plots.
"""

import pandas as pd
import matplotlib.pyplot as plt

def set_theme():
    """
    Sets the plotting theme.

    Parameters
    ----------
    None

    Returns
    -------
    None
    """

    plt.rcdefaults()
    plt.rcParams.update({
        "font.family": "serif",
        "axes.grid": True,
        "grid.alpha": 0.3
    })

def plot_data_dict(data_dict: dict[str, pd.Series]):
    """
    Plots all series in data_dict.

    Parameters
    ----------
    data_dict: dict[str, pd.Series]
        Map between a series' name and its time-indexed values.

    Returns
    -------
    None
    """

    for name, series in data_dict.items():
        plt.plot(series, label=name)

    plt.title(f"Interest Rates, {series.index[0].year}-{series.index[-1].year}")
    plt.ylabel("Annualized Interest Rate (%)")
    plt.legend()
    plt.show()

def plot_diffed_data(diffed_data: pd.DataFrame):
    """
    Plots all differenced data.

    Parameters
    ----------
    diffed_data: pd.DataFrame
        Year-indexed DataFrame of differenced interest rates.

    Returns
    -------
    None
    """
    
    diffed_data.plot(
        title=f"YoY Changes in Yearly Interest Rates, {diffed_data.index[0]}-{diffed_data.index[-1]}",
        ylabel="Change in Annualized Interest Rate (%)"
    )
    plt.show()

def plot_lm(
    x: pd.Series,
    y: pd.Series,
    predict_with_ci: callable,
    alpha: float,
    title: str
):
    """
    Plots the given linear model and its confidence interval on a scatterplot the data.

    Parameters
    ----------
    x: pd.Series
        Time-indexed Series of the differenced exogeneous rates.
    y: pd.Series
        Time-indexed Series of the differenced endogeneous rates.
    predict_with_ci: callable
        Function that takes a new Series of predictor values and an optional
        alpha level, returning a DataFrame with columns:
        - "mean": predicted values
        - "mean_ci_lower": lower bound of the prediction confidence interval
        - "mean_ci_upper": upper bound of the prediction confidence interval
    alpha: float
        The alpha for the model's confidence interval.
    title: str
        The title of the plot.

    Returns
    -------
    None
    """

    confidence_level = 1 - alpha
    x_sorted = x.values[x.argsort()]
    y_hat_sorted = predict_with_ci(x_sorted, alpha=alpha)

    plt.scatter(x, y, s=10, marker="o")
    plt.plot(
        x_sorted,
        y_hat_sorted["mean"],
        color="red",
        label="linear model",
        lw=1
    )
    plt.fill_between(
        x_sorted,
        y_hat_sorted["mean_ci_lower"],
        y_hat_sorted["mean_ci_upper"],
        color="red",
        alpha=0.3,
        label=f"{round(confidence_level * 100)}% CI"
    )
    plt.xlabel(f"{x.name} (%)")
    plt.ylabel(f"{y.name} (%)")
    plt.title(title)
    plt.legend()
    plt.show()