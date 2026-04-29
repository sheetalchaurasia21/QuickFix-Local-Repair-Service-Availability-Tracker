import { useState } from "react";

export default function ProviderReviews() {
  const [reviews] = useState([
    {
      id: 1,
      name: "Amit Sharma",
      rating: 5,
      comment: "Very professional and on time. Fixed my issue quickly!",
      date: "2026-04-20",
    },
    {
      id: 2,
      name: "Priya Das",
      rating: 4,
      comment: "Good service but slightly delayed arrival.",
      date: "2026-04-18",
    },
    {
      id: 3,
      name: "Rahul Verma",
      rating: 5,
      comment: "Excellent work! Highly recommended.",
      date: "2026-04-15",
    },
  ]);

  return (
    <div className=" md:p-10 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">Customer Reviews</h1>

      <div className="grid gap-4">

        {reviews.map((r) => (
          <div
            key={r.id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
          >
            {/* TOP */}
            <div className="flex justify-between items-center mb-2">

              <h2 className="font-semibold text-lg">{r.name}</h2>

              <span className="text-sm text-gray-500">{r.date}</span>

            </div>

            {/* STARS */}
            <div className="text-yellow-500 mb-2">
              {"⭐".repeat(r.rating)}{" "}
              <span className="text-gray-400 text-sm">
                ({r.rating}/5)
              </span>
            </div>

            {/* COMMENT */}
            <p className="text-gray-700">{r.comment}</p>
          </div>
        ))}

      </div>
    </div>
  );
}