import numpy as np

def extract_features(df):
    features = []

    # Remove Time column
    if "Time" in df.columns:
        df = df.drop(columns=["Time"])

    for col in df.columns:
        data = df[col].values

        mean = np.mean(data)
        std = np.std(data)
        max_val = np.max(data)
        min_val = np.min(data)
        range_val = max_val - min_val
        slope = np.mean(np.diff(data))

        features.extend([mean, std, max_val, min_val, range_val, slope])

    return np.array(features).reshape(1, -1)