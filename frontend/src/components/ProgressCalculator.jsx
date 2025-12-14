import React, { useState } from "react";
import RunnerV1 from "../assets/Runnerv1 2.gif";

export default function ProgressCalculator() {
  const [previousMaxWeight, setPreviousMaxWeight] = useState("");
  const [currentMaxWeight, setCurrentMaxWeight] = useState("");
  const [improvementPercentage, setImprovementPercentage] = useState(null);
  const [weightGained, setWeightGained] = useState(null);
  const [error, setError] = useState("");

  const calculateProgress = () => {
    // Clear previous error
    setError("");

    // Validate inputs
    if (!previousMaxWeight || !currentMaxWeight) {
      setError("Please enter both weights");
      return;
    }

    const prevWeight = parseFloat(previousMaxWeight);
    const currWeight = parseFloat(currentMaxWeight);

    // Validate positive numbers
    if (prevWeight <= 0 || currWeight <= 0) {
      setError("Weights must be positive numbers");
      return;
    }

    // Calculate improvement
    const weightDifference = currWeight - prevWeight;
    const improvementPercent = (weightDifference / prevWeight) * 100;

    setWeightGained(weightDifference);
    setImprovementPercentage(improvementPercent.toFixed(1));
  };

  const handleReset = () => {
    setPreviousMaxWeight("");
    setCurrentMaxWeight("");
    setImprovementPercentage(null);
    setWeightGained(null);
    setError("");
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 max-w-md mx-auto">
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
      <h2 className="text-2xl font-bold mb-6 text-white">Progress %</h2>

      {/* Input Section */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-white">
            Previous Max Weight (lbs)
          </label>
          <input
            type="number"
            value={previousMaxWeight}
            onChange={(e) => setPreviousMaxWeight(e.target.value)}
            placeholder="e.g., 185"
            className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-white">
            Current Max Weight (lbs)
          </label>
          <input
            type="number"
            value={currentMaxWeight}
            onChange={(e) => setCurrentMaxWeight(e.target.value)}
            placeholder="e.g., 205"
            className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/50 border border-red-600 rounded p-3 mb-4">
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}
      <br></br>
      <br></br>
      {/* Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={calculateProgress}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
        >
          Calculate
        </button>
        <button
          onClick={handleReset}
          className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 rounded transition"
        >
          Reset
        </button>
      </div>

      {/* Results Section */}
      {improvementPercentage !== null && (
        <div className="space-y-4 animate-fadeIn">
          {/* Celebration Animation */}
          <div className="flex justify-center mb-4">
            <img
              src={RunnerV1}
              alt="celebration"
              style={{ width: "80px", height: "80px" }}
              className="animate-bounce"
            />
          </div>

          {/* Weight Gained */}
          {/* <div className="bg-slate-700 rounded p-4">
            <p className="text-sm text-slate-400 mb-1">Weight Gained</p>
            <p className="text-3xl font-bold text-blue-400">
              +{weightGained.toFixed(1)} lbs
            </p>
          </div> */}

          {/* Improvement Percentage */}
          <div
            className={`rounded p-4 ${
              improvementPercentage >= 0
                ? "bg-gradient-to-r from-green-600 to-emerald-600"
                : "bg-gradient-to-r from-orange-600 to-red-600"
            }`}
          >
            {/* <p className="text-sm text-white/80 mb-1">Improvement</p> */}
            <p className="text-3xl font-bold text-white">
              {improvementPercentage >= 0 ? "+" : ""}
              {improvementPercentage}%
            </p>
          </div>

          {/* Breakdown */}
          <div className="bg-slate-700 rounded p-4 text-sm text-slate-300">
            <p>
              {previousMaxWeight} lbs → {currentMaxWeight} lbs
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
