import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate=useNavigate();
  return (
    <footer className="bg-green-800 text-gray-300 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white">QuickFix</h2>
          <p className="mt-3 text-sm text-gray-400">
            Your trusted platform for fast, reliable home services.
            Book professionals instantly and get things fixed hassle-free.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer" onClick={() => navigate("/")}>
              Home
            </li>
            <li className="hover:text-white cursor-pointer" onClick={() => navigate("/services")}>
              Services
            </li>
            <li className="hover:text-white cursor-pointer" onClick={() => navigate("/bookings")}>
              Bookings
            </li>
            <li className="hover:text-white cursor-pointer" onClick={() => navigate("/help")}>
              Help Center
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <p className="text-sm">📍 Bhubaneswar, Odisha</p>
          <p className="text-sm mt-1">📞 +91 98765 43210</p>
          <p className="text-sm mt-1">✉️ support@quickfix.com</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} QuickFix. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
