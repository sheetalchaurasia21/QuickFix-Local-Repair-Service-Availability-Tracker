export default function BookingCard({ booking }) {
  return (
    <div className="flex justify-between items-center border p-4 rounded-xl mb-3">

      <div>
        <h3 className="font-semibold">{booking.serviceRequested}</h3>
        <p className="text-sm text-gray-500">
          {booking.userId?.name}
        </p>
        <p className="text-sm text-gray-400">
          {booking.date} • {booking.time}
        </p>
      </div>

      <div>
        <p className="font-bold">₹ {booking.cost}</p>
        <button className="bg-green-500 text-white px-3 py-1 rounded mt-2">
          View
        </button>
      </div>

    </div>
  );
}