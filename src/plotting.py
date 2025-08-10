"""
Helper methods for making and saving paper-ready plots.
"""

import pandas as pd
import matplotlib.pyplot as plt
import statsmodels.api as sm

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
    plt.xlabel(f"{x.name}")
    plt.ylabel(f"{x.name}")
    plt.title(title)
    plt.legend()
    plt.show()