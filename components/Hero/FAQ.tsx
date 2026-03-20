"use client";

import { useState, useRef, useEffect } from "react";

const faqs = [
  {
    question: "What is Queueflow+ exactly?",
    answer:
      `QueueFlow is an enterprise-grade cloud platform that replaces physical waiting 
      lines with digital queues. It allows your customers to join a virtual line from 
      their mobile devices, providing them with real-time updates while allowing your 
      staff to manage the flow through a centralized dashboard.`,
  },
  {
    question: "How do I get a queue number?",
    answer:
      `You can get a queue number by scanning a QR code at the location, visiting the 
      business's QueueFlow link, or receiving an SMS invitation from staff.`,
  },
  {
    question: "Do I need to stay in line physically?",
    answer:
      `No! That's the beauty of QueueFlow+. You can wait anywhere — a nearby café, 
      your car, or at home — and you'll receive SMS updates when your turn is approaching.`,
  },
  {
    question: "What happens if I miss my turn?",
    answer:
      `If you miss your turn, the system will notify you and give you a grace period 
      to return. Staff can also manually hold your position if needed.`,
  },
  {
    question: "Why is QueueFlow+ better than manual queues?",
    answer:
      `QueueFlow+ eliminates physical crowding, reduces perceived wait times, gives 
      staff real-time control, and provides admins with powerful analytics to optimize 
      operations.`,
  },
  {
    question: "Is QueueFlow free to use?",
    answer:
      `QueueFlow+ offers a free tier for small businesses with limited queues. Paid 
      plans unlock advanced analytics, unlimited queues, priority support, and 
      custom branding.`,
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="w-full py-20 bg-[#f5f5f3]">
      <div className="max-w-6xl mx-auto flex flex-col gap-20 md:flex-row">
        {/* Left */}
        <div className="md:w-72 shrink-0">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">FAQ</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Everything you need to know about the platform and how to get started. Can&apos;t find the answer? Reach out to our support team.
          </p>
          <p className="text-xs font-semibold text-blue-500 tracking-widest uppercase mb-3">
            Need more answers?
          </p>
          <div className="flex gap-3 text-nowrap">
            <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
              Email Support
            </button>
            <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
              Contact Sales
            </button>
          </div>
        </div>

        {/* Right - Accordion */}
        <div className="flex-1 flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AccordionItem({
  faq,
  isOpen,
  onClick,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 hover:cursor-pointer transition-colors"
      >
        <span>{faq.question}</span>
        <svg
          className={`w-4 h-4 text-gray-400 flex-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      <div
        ref={contentRef}
        style={{ height }}
        className="px-5 overflow-hidden transition-[height] duration-300 ease-in-out"
      >
        <p
          className={`text-sm text-gray-500 leading-relaxed py-2 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {faq.answer}
        </p>
      </div>
    </div>
  );
}