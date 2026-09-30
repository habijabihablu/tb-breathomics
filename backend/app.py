from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

from utils.feature import extract_features, SENSOR_COLUMNS, TIME_COL

app = Flask(__name__)
CORS(app,origins=["https://tb-breathomics-tawny.vercel.app"])  # allow frontend to talk

# Load model
model = joblib.load("model/tb_model.pkl")
scaler = joblib.load("model/scaler.pkl")

@app.route("/")
def home():
    return "TB Breathomics API Running"

@app.route("/predict-tb", methods=["POST"])
def predict_tb():
    try:
        file = request.files["file"]

        # Read file
        if file.filename.endswith(".csv") or file.filename.endswith(".txt"):
            df = pd.read_csv(file)
        else:
            df = pd.read_excel(file)

        # Normalize column names to uppercase to handle inconsistent casing
        df.columns = [c.upper() for c in df.columns]

        # Drop time and temperature (not used by the model)
        for col in ["T", "TIME", "TEMP"]:
            if col in df.columns:
                df = df.drop(columns=[col])

        # Required columns: time + all sensor columns used in training
        # (Temp, if present in the uploaded file, is simply ignored)
        required_cols = [TIME_COL] + SENSOR_COLUMNS

        if not all(col in df.columns for col in required_cols):
            return jsonify({"error": "Invalid file format"})

        # Extract features in the exact order the model was trained on
        features = extract_features(df, sensor_cols=SENSOR_COLUMNS, time_col=TIME_COL)

        # Scale
        features_scaled = scaler.transform(features)

        # Predict
        pred = model.predict(features_scaled)[0]
        score = model.decision_function(features_scaled)[0]

        return jsonify({
            "prediction": int(pred),
            "result": "TB Detected" if pred == 1 else "Healthy",
            "confidence": float(score)
        })

    except Exception as e:
        return jsonify({"error": str(e)})

import os

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))