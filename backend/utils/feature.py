import numpy as np
from scipy.stats import skew, kurtosis

# Exact column order used when the model was trained — do not reorder
SENSOR_COLUMNS = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9",
                   "Hum", "VOC", "s10", "s11"]
TIME_COL = "T"
BASELINE_FRAC = 0.1

def extract_features(df, sensor_cols=SENSOR_COLUMNS, time_col=TIME_COL, baseline_frac=BASELINE_FRAC):
    n = len(df)
    n_base = max(1, int(n * baseline_frac))
    t = df[time_col].values.astype(float) if time_col in df.columns else np.arange(n, dtype=float)

    feats = []
    for col in sensor_cols:
        x = df[col].values.astype(float)
        baseline = x[:n_base].mean()
        final = x[-n_base:].mean()

        feats.append(x.mean())
        feats.append(x.std())
        feats.append(x.min())
        feats.append(x.max())
        feats.append(x.max() - x.min())
        feats.append(baseline)
        feats.append(final)
        feats.append(final - baseline)
        feats.append(np.trapezoid(x, t) if len(t) == len(x) else np.trapezoid(x))
        feats.append(np.polyfit(t, x, 1)[0] if np.ptp(t) > 0 else 0.0)
        feats.append(skew(x) if x.std() > 0 else 0.0)
        feats.append(kurtosis(x) if x.std() > 0 else 0.0)

    return np.array(feats).reshape(1, -1)