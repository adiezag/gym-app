import React, { useState } from "react";
import ProgressCalculator from "../components/ProgressCalculator";
import GetBarWeight from "../components/GetBarWeight";

export default function Home() {
  const [activeTab, setActiveTab] = useState("progress");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          {/* <h1 className="text-4xl font-bold mb-2"></h1> */}
          <p className="text-slate-400">
            {/* Calculate plates • Track progress • Celebrate wins */}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab("progress")}
            className={`px-6 py-2 rounded font-semibold transition ${
              activeTab === "progress"
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Progress Calculator
          </button>
          <button
            onClick={() => setActiveTab("barWeight")}
            className={`px-6 py-2 rounded font-semibold transition ${
              activeTab === "barWeight"
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Bar Weight
          </button>
        </div>

        {/* Component Render */}
        <div className="flex justify-center">
          {activeTab === "progress" && <ProgressCalculator />}
          {activeTab === "barWeight" && <GetBarWeight />}
        </div>
      </div>
    </div>
  );
}
