"use client";

import { useState } from "react";

const services = [
  {
    id: 1,
    category: "GENERAL SERVICE",
    status: "OPEN",
    people: 12,
    time: 45,
  },
  {
    id: 2,
    category: "GENERAL SERVICE",
    status: "OPEN",
    people: 12,
    time: 45,
  },
  {
    id: 3,
    category: "GENERAL SERVICE",
    status: "OPEN",
    people: 12,
    time: 45,
  },
  {
    id: 4,
    category: "DENTAL SERVICE",
    status: "OPEN",
    people: 5,
    time: 20,
  },
  {
    id: 5,
    category: "PHARMACY",
    status: "OPEN",
    people: 8,
    time: 30,
  },
];

function ServiceIllustration() {
  return (
    <div className="w-full h-40 bg-blue-50 rounded-t-xl flex items-center justify-center overflow-hidden relative">
      {/* Blue speech bubble */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-20 bg-blue-400 rounded-2xl flex items-center justify-center shadow-lg">
        <span className="text-white text-2xl font-black tracking-tight">FAQ</span>
        {/* Bubble tail */}
        <div className="absolute -bottom-3 left-6 w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-blue-400" />
      </div>
      {/* Green cross */}
      <div className="absolute top-4 left-1/2 -translate-x-8 w-5 h-5 text-green-400">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 2h2v6h6v2h-6v6H9v-6H3V8h6V2z" />
        </svg>
      </div>
      {/* Green heart */}
      <div className="absolute top-4 right-8 w-5 h-5 text-green-400">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
      {/* Small circles decoration */}
      <div className="absolute bottom-4 left-8 w-2 h-2 rounded-full bg-blue-200" />
      <div className="absolute bottom-6 right-10 w-1.5 h-1.5 rounded-full bg-blue-300" />
      {/* Nurse figure (simplified) */}
      <div className="absolute bottom-0 left-6 flex flex-col items-center">
        <div className="w-6 h-6 rounded-full bg-amber-300" />
        <div className="w-8 h-10 bg-blue-300 rounded-t-lg mt-0.5" />
      </div>
    </div>
  );
}

// CARD
function ServiceCard({ service }: { service: (typeof services)[0] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex-shrink-0 w-82">
      <ServiceIllustration />
      <div className="p-4 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-bold text-gray-700 tracking-wide">
            {service.category}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-500 font-medium">STATUS:</span>
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            <span className="text-xs text-green-600 font-semibold">
              {service.status}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            {service.people} PEOPLE AHEAD OF YOU
          </p>
          <p className="text-xs text-gray-500">
            TIME ESTIMATION: {service.time} MINUTES
          </p>
        </div>
        <button className="w-full bg-blue-400 hover:bg-blue-500 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">
          VIEW DETAILS
        </button>
      </div>
    </div>
  );
}

// ── Main Page ───────────────────────────────────────────────────────────────
export default function JoinQueuePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visible = 3;
  const maxIndex = services.length - visible;

  const prev = () => setCurrentIndex((i) => Math.max(i - 1, 0));
  const next = () => setCurrentIndex((i) => Math.min(i + 1, maxIndex));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Join Queue</h1>
          <p className="text-sm text-gray-400 mt-1">
            Select a service to get your queue number
          </p>
        </div>

        {/* Browse all */}
        <div className="flex justify-end mb-5">
          <button className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors">
            Browse all categories
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center gap-4">
          <button
            title="previous"
            onClick={prev}
            disabled={currentIndex === 0}
            className="flex-shrink-0 w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          {/* Cards viewport */}
          <div className="flex-1 overflow-hidden">
            <div
              className="flex gap-5 transition-transform duration-300"
              style={{ transform: `translateX(-${currentIndex * (288 + 20)}px)` }}
            >
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>

          <button
            title="next"
            onClick={next}
            disabled={currentIndex >= maxIndex}
            className="flex-shrink-0 w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
