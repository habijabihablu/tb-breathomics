from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

from utils.feature import extract_features

app = Flask(__name__)
CORS(app)  # allow frontend to talk

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

        # Expected sensor columns
        expected_cols = ['S1','S2','S3','S4','S5','S6','S7','S8','S9','S10','S11','VOC']

        # Drop time
        if "Time" in df.columns:
            df = df.drop(columns=["Time"])

        # Check columns
        if not all(col in df.columns for col in expected_cols):
            return jsonify({"error": "Invalid file format"})

        # Reorder
        df = df[expected_cols]

        # Extract features
        features = extract_features(df)

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