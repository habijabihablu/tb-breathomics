import { useState } from "react";
import DiseaseCard from "../components/DiseaseCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Home() {
  const [selected, setSelected] = useState(null);
  const diseaseInfo = {
  tb: {
    title: "Tuberculosis (TB)",
    desc: "A contagious bacterial infection affecting lungs.",
    spread: "Spread through air when infected person coughs or sneezes.",
    damage: "Damages lung tissues and reduces oxygen intake.",
    death: "One of the top infectious disease killers globally.",
    cure: "Treatable with antibiotics over 6–9 months.",
  },

  smoking: {
    title: "Smoking Impact",
    desc: "Alters breath VOC composition.",
    spread: "Not infectious but affects lungs.",
    damage: "Causes chronic lung damage and cancer risk.",
    death: "Major cause of preventable deaths.",
    cure: "Reversible in early stages after quitting.",
  },

  anemia: {
    title: "Anemia",
    desc: "Low hemoglobin affecting oxygen transport.",
    spread: "Not infectious.",
    damage: "Causes fatigue and weak oxygen supply.",
    death: "Severe cases can be life-threatening.",
    cure: "Treatable with diet and medication.",
  },

  air: {
    title: "Airborne Diseases",
    desc: "Diseases caused by polluted air.",
    spread: "Through polluted environment.",
    damage: "Affects lungs and breathing capacity.",
    death: "Linked to respiratory mortality.",
    cure: "Prevention via clean air + treatment.",
  },
};
  const diseases = [
  {
    key: "tb",
    name: "Tuberculosis",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    key: "smoking",
    name: "Smoking Impact",
    image: "https://images.unsplash.com/photo-1626448989051-55264063656f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    key: "anemia",
    name: "Anemia",
    image: "https://images.unsplash.com/photo-1681486359169-f4f4c0b61c43?q=80&w=1421&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    key: "air",
    name: "Airborne Disease",
    image: "https://images.unsplash.com/photo-1587019705911-167800492489?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

  const chartData = [
    { x: 1, value: 30 },
    { x: 2, value: 50 },
    { x: 3, value: 40 },
    { x: 4, value: 70 },
    { x: 5, value: 60 },
  ];

  return (
    <div>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">
        Health Insights Dashboard
      </h1>
        {/* graph */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
         <h2 className="font-semibold mb-4">Overall Breath Pattern Analysis</h2>

        <ResponsiveContainer width="100%" height={250}>
         <LineChart data={chartData}>
        <XAxis dataKey="x" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" strokeWidth={3} />
        </LineChart>
        </ResponsiveContainer>
    </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {diseases.map((d, i) => (
          <DiseaseCard
            key={i}
            title={d.name}
            image={d.image}
            onClick={() => setSelected(d.key)}
          />
        ))}
      </div>

      {/* Expanded Section */}
{selected && diseaseInfo[selected] && (
  <div className="bg-white p-6 rounded-xl shadow grid md:grid-cols-2 gap-6 mt-6">

    {/* LEFT */}
    <div>
      <h2 className="text-xl font-bold mb-2">
        {diseaseInfo[selected].title}
      </h2>

      <p className="text-gray-600 mb-3">
        {diseaseInfo[selected].desc}
      </p>

      <ul className="text-sm text-gray-600 space-y-2">
        <li><b>Spread:</b> {diseaseInfo[selected].spread}</li>
        <li><b>Damage:</b> {diseaseInfo[selected].damage}</li>
        <li><b>Death Rate:</b> {diseaseInfo[selected].death}</li>
        <li><b>Cure:</b> {diseaseInfo[selected].cure}</li>
      </ul>
    </div>

    {/* RIGHT */}
    <div>
      <h3 className="font-semibold mb-2">Disease Trend</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Line dataKey="value" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>

  </div>
)}

    </div>
  );
}