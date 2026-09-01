import { useState } from "react";
import SensorChart from "../components/SensorChart";
import jsPDF from "jspdf";

export default function TBPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState("S1");

const handleUpload = async () => {
  if (!file) {
    alert("Please select a file");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    setLoading(true);

    // 👉 READ FILE LOCALLY FOR GRAPH
    const text = await file.text();
    const rows = text.split("\n").slice(1);

    const parsed = rows.map((row, i) => {
      const cols = row.split(",");
      return {
        index: i,
        S1: parseFloat(cols[1]),
        S2: parseFloat(cols[2]),
        VOC: parseFloat(cols[12]),
      };
    });

    setChartData(parsed);

    // 👉 API CALL
    const res = await fetch("https://tb-breathomics-backend.onrender.com/predict-tb", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);

    setLoading(false);
  } catch (error) {
    console.error(error);
    alert("Error");
    setLoading(false);
  }
};
//downloading report
const downloadReport = () => {
  if (!result) return;

  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("TB Breathomics Report", 20, 20);

  doc.setFontSize(12);
  doc.text(`Result: ${result.result}`, 20, 40);
  doc.text(`Confidence: ${result.confidence.toFixed(3)}`, 20, 50);

  doc.text("Analysis:", 20, 70);
  doc.text(
    "This result is based on breath VOC sensor data analyzed using ML.",
    20,
    80
  );

  doc.save("TB_Report.pdf");
};

  return (
  <div className="grid md:grid-cols-2 gap-6">

    {/* LEFT: Upload */}
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        🫁 TB Detection
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        Upload breath sensor data (.csv/.txt) to analyze TB presence.
      </p>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      {file && (
        <p className="text-sm text-gray-600 mb-2">
          {file.name}
        </p>
      )}

      <button
        onClick={handleUpload}
        className="w-full py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "Processing..." : "Analyze"}
      </button>

      <select
        value={selectedSensor}
        onChange={(e) => setSelectedSensor(e.target.value)}
        className="mt-4 w-full p-2 border rounded"
      >
        {["S1","S2","S3","S4","S5","S6","S7","S8","S9","S10","S11","VOC"].map(s => (
        <option key={s}>{s}</option>
         ))}
      </select>

      {result && (
        <div className="mt-6 p-4 rounded bg-gray-100">
          <p className={`text-lg font-bold ${
            result.prediction === 1
              ? "text-red-500"
              : "text-green-500"
          }`}>
            {result.result}
          </p>

          <p className="text-sm text-gray-500">
            Confidence: {result.confidence.toFixed(3)}
          </p>
        </div>
      )}

      <button
            onClick={downloadReport}
            className="mt-4 w-full py-2 bg-green-600 text-white rounded"
      >
        Download Report
      </button>

      {chartData.length > 0 && (
        <div className="mt-6">
        <h3 className="font-semibold mb-2">
        Sensor Visualization ({selectedSensor})
        </h3>
        <SensorChart data={chartData} sensor={selectedSensor} />
        </div>
       )}
    </div>

    {/* RIGHT: Info Panel */}
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-semibold mb-3">
        About TB Detection
      </h3>

      <p className="text-sm text-gray-600 mb-4">
        This system analyzes breath VOC patterns using sensor arrays
        and machine learning to detect tuberculosis.
      </p>

      <ul className="text-sm text-gray-600 space-y-2">
        <li>✔ Non-invasive method</li>
        <li>✔ Fast analysis</li>
        <li>✔ AI-based prediction</li>
        <li>✔ Research-grade system</li>
      </ul>
    </div>

  </div>
);
}