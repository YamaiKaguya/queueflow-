"use client";

import Image from "next/image";
import { features } from "@/src/data/whatmakesit"; 

function FeatureCard({feature}: {
  feature: (typeof features)[0];
}) {

  return (
    <div
      className={`
      ${feature.span}
      min-h-50
      rounded-2xl border border-gray-100 bg-white p-6
      flex flex-col gap-3 overflow-hidden relative
      transition-transform  duration-300 ease-out
      hover:-translate-y-1 hover:shadow-lg cursor-pointer
      `}
  >
    <span className="
    w-8 
    h-8 
    flex 
    items-center 
    justify-center
    rounded-lg bg-blue-50">
        {feature.icon}
    </span>

    <h3 className={`text-gray-900 ${feature.titleStyle} leading-snug`}>
        {feature.title}
    </h3>

    <p className="text-gray-500 text-sm leading-relaxed">
        {feature.description}
    </p>

    {feature.hasImage &&  feature.imageSrc && (
      <div className="mt-2 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
        <div className="relative w-full h-44">
          <Image 
            src={feature.imageSrc}
            alt="feature image"
            fill
            className="object-cover"
          />
        </div>
      </div>
      )}
    </div>
  );
}

export default function WhatMakesItWork() {
  return (
    <section className="w-full min-h-dvh bg-[#f5f5f3] py-20">
      <div className="
        max-w-6xl 
        mx-auto
        ">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            What makes it work
          </h2>
          <p className="text-gray-500 text-base leading-relaxed max-w-4xl mx-auto">
            Simplifies queue management by combining virtual queuing, real-time
            tracking, and smart dashboards. It helps businesses serve customers
            faster while keeping everyone informed about their place in line.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature}/>
          ))}
        </div>
      </div>
    </section>
  );
}