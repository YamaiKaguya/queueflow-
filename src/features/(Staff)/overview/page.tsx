"use client";

import React from "react";
import {
  Smile,
  ScanLine,
  FlaskConical,
  MessageSquare,
  Baby,
} from "lucide-react";
import { useDepartmentSummary } from "./_hooks/useOverview";

// Updated Icon map with the soft background styling seen in the image
const ICON_MAP: Record<string, React.ReactNode> = {
  dental: <Smile className="text-blue-500" size={24} />,
  xray: <ScanLine className="text-blue-500" size={24} />,
  laboratory: <FlaskConical className="text-blue-500" size={24} />,
  consultation: <MessageSquare className="text-blue-500" size={24} />,
  pediatrics: <Baby className="text-blue-500" size={24} />,
};

export default function DepartmentStatusSummary() {
  const { data, loading, highLoadCount } = useDepartmentSummary();

  // Calculate total patients for the summary card
  const totalPatients = data.reduce((acc, dept) => acc + dept.people_ahead, 0);

  return (
    <div className="p-10 bg-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-semibold text-slate-900 tracking-tight">
            Department Status Summary
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            Real-time monitoring of clinical throughput and patient load
          </p>
        </header>

        <section>
          <h2 className="text-xl font-bold text-blue-500 mb-6">Active Patient Flow</h2>

          {loading ? (
            <div className="text-center py-20 text-slate-400">Loading department data...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((dept, index) => {
                const isHigh = dept.status === "high-load";
                
                return (
                  <div 
                    key={`${dept.service_id}-${index}`}
                    className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between"
                  >
                    {/* Top Row: Icon, Name, and Wait Time */}
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-slate-50 rounded-2xl shadow-inner">
                          {ICON_MAP[dept.service_id] || <Smile size={24} />}
                        </div>
                        <h3 className="text-2xl font-semibold text-slate-800 tracking-tight">
                          {dept.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                          Estimated Wait
                        </p>
                        <p className={`text-2xl font-bold ${isHigh ? 'text-red-500' : 'text-blue-500'}`}>
                          {dept.estimated_wait} <span className="text-sm font-medium">min</span>
                        </p>
                      </div>
                    </div>

                    <div className="h-px bg-slate-100 w-full mb-6" />

                    {/* Bottom Row: Avg Service and People Ahead */}
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                          AVG Service
                        </p>
                        <p className="text-lg font-medium text-slate-700">
                          {dept.avg_service} min
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2">
                          People Ahead
                        </p>
                        <div className="bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm shadow-blue-200">
                          {dept.people_ahead} Patients
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Footer Info */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="flex gap-6 text-xs font-bold uppercase tracking-widest text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              Optimal Performance
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              High Resource Load
            </div>
          </div>

          {/* Total Load Card */}
          <div className="w-full md:w-80 bg-blue-400 rounded-2xl p-6 text-white shadow-lg shadow-blue-100">
            <h4 className="text-center font-bold text-lg mb-2">Total Hospital Load</h4>
            <div className="text-4xl font-bold text-center mb-4">
              {totalPatients} <span className="text-lg font-normal opacity-90">Patients</span>
            </div>
            <div className="space-y-2">
              <div className="w-full bg-blue-300/50 h-2 rounded-full overflow-hidden">
                <div className="bg-white h-full rounded-full" style={{ width: '60%' }} />
              </div>
              <p className="text-[10px] text-center font-bold opacity-80 uppercase tracking-tighter">
                60% Capacity Utilized
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}