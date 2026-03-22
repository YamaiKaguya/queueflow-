"use client";

import { useState } from "react";

export default function CTABanner() {
  const [email, setEmail] = useState("");

  return (
    <section className="w-full bg-white py-20">
      <div className="
        max-w-6xl 
        bg-blue-400 
        rounded-3xl 
        py-16 
        mx-auto 
        flex 
        flex-col 
        items-center 
        text-center
      ">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
          Ready to transform your
          <br />
          wait time?
        </h2>

        {/* Subheading */}
        <p className="text-blue-100 text-sm mb-8">
          Join 1,000+ businesses delivering better experiences today.
        </p>

        {/* Input & Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
          <div className="relative flex-1 w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email"
              className="
                w-full pl-4 pr-10 py-3 rounded-xl text-sm text-gray-700 
                placeholder-gray-400 bg-white bg-opacity-90 border border-transparent
                focus:outline-none focus:ring-2 focus:ring-white
                transition-shadow duration-300
                focus:shadow-lg
              "
            />
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75"
              />
            </svg>
          </div>
          <button className="
            w-full sm:w-auto bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold text-sm 
            hover:bg-blue-50 hover:scale-105 transition-all duration-300 cursor-pointer
          ">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
}