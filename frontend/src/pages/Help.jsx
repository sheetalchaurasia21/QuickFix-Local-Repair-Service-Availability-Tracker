import { useState } from "react";

export default function Help() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How do I book a service?",
      a: "Go to Services → choose a provider → click Book Now → select date & time → confirm booking.",
    },
    {
      q: "Can I cancel my booking?",
      a: "Yes, go to My Bookings and click Cancel (only before completion).",
    },
    {
      q: "How do I update my profile?",
      a: "Go to Profile → click Edit → update details → Save.",
    },
    {
      q: "What if provider is unavailable?",
      a: "Try selecting another provider or check later for availability.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-5xl space-y-8">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Help Center
          </h1>
          <p className="text-gray-500 mt-2">
            We're here to help you with anything
          </p>
        </div>

        {/* CONTACT CARD */}
        <div className="bg-green-700 text-white rounded-2xl p-8 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>

          <div className="space-y-3 text-lg">
            <p>📍 Bhubaneswar, Odisha</p>
            <p>📞 +91 98765 43210</p>
            <p>✉️ support@quickfix.com</p>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "My Bookings",
              desc: "View, manage or cancel your bookings",
            },
            {
              title: "Profile",
              desc: "Update your personal details",
            },
            {
              title: "Services",
              desc: "Explore available service providers",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition cursor-pointer"
            >
              <h3 className="font-semibold text-lg text-gray-800">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ SECTION */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-lg font-semibold mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((item, i) => (
              <div
                key={i}
                className="border rounded-lg px-4 py-2 cursor-pointer"
                onClick={() =>
                  setOpenIndex(openIndex === i ? null : i)
                }
              >
                <div className="flex justify-between items-center">
                  <p className="font-medium text-lg text-gray-800">
                    {item.q}
                  </p>
                  <span className="text-xl">
                    {openIndex === i ? "-" : "+"}
                  </span>
                </div>

                {openIndex === i && (
                  <p className="text-gray-500 mt-3 text-sm">
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER HELP */}
        <div className="text-center text-gray-500 text-sm">
          Still need help? Contact our support team anytime.
        </div>

      </div>
    </div>
  );
}