"""
Helper methods for creating linear models between linked interest rates.
"""

import pandas as pd
import statsmodels.api as sm

def fit_lm(x: pd.Series, y: pd.Series):
    """
    Fits a linear model to the given data, treating each (x, y) pair as independent.

    Parameters
    ----------
    x: pd.Series
        Time-indexed Series of the differenced exogeneous rates.
    y: pd.Series
        Time-indexed Series of the differenced endogeneous rates.fro

    Returns
    -------
    predict_with_ci: callable
        Function that takes a new Series of predictor values and an optional
        alpha level, returning a DataFrame with columns:
        - "mean": predicted values
        - "mean_ci_lower": lower bound of the prediction confidence interval
        - "mean_ci_upper": upper bound of the prediction confidence interval
    model: sm.regression.linear_model.RegressionResultsWrapper
        The fitted OLS regression model from statsmodels.
    """
    
    X = sm.add_constant(x)
    model = sm.OLS(y, X).fit()

    def predict_with_ci(x_new: pd.Series, alpha=0.05):
        X_new = sm.add_constant(x_new)
        sf = model.get_prediction(X_new).summary_frame(alpha=alpha)

        return sf[["mean", "mean_ci_lower", "mean_ci_upper"]]
    
    return predict_with_ci, model