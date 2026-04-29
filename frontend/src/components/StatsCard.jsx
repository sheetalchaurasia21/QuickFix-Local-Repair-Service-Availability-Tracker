export default function StatsCard({ title, value, color }) {
  return (
    <div className={`flex flex-col items-center justify-center p-5 rounded-lg shadow-md text-center ${color}`}>
      <h3 className="text-lg font-semibold text-gray-800 hover:scale-105 transition-transform">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
