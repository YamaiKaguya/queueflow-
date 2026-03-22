"use client";

import Image from "next/image";
import { useRef } from "react"; 

import { steps } from "@/src/data/howitowrks"; 


export default function HowItWorks() {
  return (
    <section className="w-full bg-white py-20">
      <div className="   
      max-w-6xl 
      mx-auto 
      ">

        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            How QueueFlow+ works for everyone
          </h2>
          <p className="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
            helps users wait smarter, staff manage the flow efficiently, and
            admins track insights to optimize service—all in one seamless system.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {steps.map((step) => (
            <RoleCard key={step.id} step={step}  />
          ))}
        </div>
      </div>
    </section>
  );
}

interface Step {
  id: string;
  role: string;
  description: string;
  avatar: string;
  items: string[];
  highlighted: boolean;
}
function RoleCard({ step }: { step: Step }) {
  const ref = useRef<HTMLDivElement>(null); 

  return (
    <div
      ref={ref}
      className={`
        rounded-2xl p-6 flex flex-col gap-5
        ${step.highlighted ? "bg-white shadow-md border border-gray-100" : "bg-white shadow-sm border border-gray-100"}
        transition-transform  duration-300 ease-out
        hover:-translate-y-1 hover:shadow-lg cursor-pointer
      `}
    >
      <div className="flex flex-col items-center text-center gap-3">
        <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-gray-100 shadow-sm">
          <Image
            src={step.avatar}
            alt={step.role}
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{step.role}</h3>
          <p className="text-xs text-gray-400 mt-1 leading-relaxed max-w-50 mx-auto">
            {step.description}
          </p>
        </div>
      </div>

      {/* Step Items */}
      <div className="flex flex-col gap-2">
        {step.items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 transition-transform duration-200 hover:translate-x-1"
          >
            <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-semibold flex items-center justify-center shrink-0">
              {i + 1}
            </span>
            <span className="text-sm text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}