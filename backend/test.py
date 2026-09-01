import joblib

model = joblib.load("model/tb_model.pkl")
scaler = joblib.load("model/scaler.pkl")

print("✅ Model and scaler loaded successfully")