import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Footer() {
  const [email, setEmail] = useState("");
  const handleSubscribe = () => {
    if (!email) {
      toast.error("Please enter a valid email!");
      return;
    }
    toast.success("Subscribed successfully");
    setEmail("");
  };
  return (
    <footer className="bg-gray-900 w-full mt-10 text-white">
      <div className="md:px-36 px-8 py-10 border-b border-white/20">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Logo and About */}
          <div className="flex flex-col md:items-start items-center w-full">
            <img
              className="invert w-36"
              src={assets.logoup}
              alt="SkillSphere logo"
            />
            <p className="mt-6 text-sm text-white/70 text-center md:text-left max-w-sm">
              SkillSphere is your gateway to hands-on learning. Explore
              practical courses, get certified, and grow your skills at your own
              pace.
            </p>
          </div>

          {/* Company Links */}
          <div className="flex flex-col md:items-start items-center w-full">
            <h2 className="font-semibold text-white mb-4">Company</h2>
            <ul className="flex md:flex-col md:space-y-2 space-x-4 md:space-x-0 text-sm text-white/80">
              <li>
                <a href="#">Home</a>
              </li>
              <Link to={"/about-us"} onClick={() => scrollTo(0, 0)}>
                About us
              </Link>
              {/* <li>
                <a href="#">About Us</a>
              </li> */}
              <Link to={"/contact-us"} onClick={() => scrollTo(0, 0)}>
                Contact us
              </Link>
            </ul>
          </div>

          {/* Newsletter  */}
          <div className="flex flex-col md:items-start items-center w-full">
            <h2 className="font-semibold text-white mb-4">
              Subscribe to our newsletter
            </h2>
            <p className="text-sm text-white/70 text-center md:text-left">
              Get the latest news, articles, and updates delivered to your inbox
              weekly.
            </p>
            <div className="flex items-center gap-2 pt-4 w-full max-w-xs">
              <input
                type="email"
                value={email}
                placeholder="Enter your email"
                className="w-full h-9 rounded px-3 text-sm bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={handleSubscribe}
                className="h-9 px-4 bg-blue-600 rounded text-sm font-medium hover:bg-blue-700 transition"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-4 text-xs text-white/60">
        © 2025 SkillSphere. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
