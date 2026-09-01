export default function DiseaseCard({ title, image, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-xl shadow cursor-pointer hover:shadow-xl transition"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-28 object-cover rounded mb-2"
      />

      <h3 className="font-semibold">{title}</h3>

      <p className="text-xs text-gray-500 mt-1">
        Click to explore
      </p>
    </div>
  );
}