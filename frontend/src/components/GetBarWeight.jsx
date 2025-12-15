import React, { useState } from "react";

export default function GetBarWeight() {
  const [barWeight, setBarWeight] = useState(45);
  const [isLoadedEvenly, setIsLoadedEvenly] = useState(false);
  const [selectedPlateWeight, setSelectedPlateWeight] = useState("45");
  const [plateQuantity, setPlateQuantity] = useState("");
  const [platesAdded, setPlatesAdded] = useState([]);
  const [totalWeight, setTotalWeight] = useState(null);
  const [error, setError] = useState("");

  const standardPlates = [45, 35, 25, 10, 5, 2.5];

  const addPlate = () => {
    setError("");

    if (!plateQuantity || plateQuantity <= 0) {
      setError("Please enter a valid quantity");
      return;
    }

    const weight = parseFloat(selectedPlateWeight);
    const quantity = parseInt(plateQuantity);

    const newPlate = {
      id: Date.now(),
      weight,
      quantity,
    };

    setPlatesAdded([...platesAdded, newPlate]);
    setPlateQuantity("");
    setSelectedPlateWeight("45");
  };

  const removePlate = (id) => {
    setPlatesAdded(platesAdded.filter((plate) => plate.id !== id));
  };

  const calculateTotalWeight = () => {
    setError("");

    if (platesAdded.length === 0) {
      setError("Please add at least one plate");
      return;
    }

    let total = barWeight;

    if (isLoadedEvenly) {
      // Scenario 2: Even loading - plates are on one side, multiply by 2
      const plateSumOneSide = platesAdded.reduce(
        (sum, plate) => sum + plate.weight * plate.quantity,
        0
      );
      total += plateSumOneSide * 2;
    } else {
      // Scenario 1: Uneven loading - each plate is independent
      platesAdded.forEach((plate) => {
        total += plate.weight * plate.quantity;
      });
    }

    setTotalWeight(total);
  };

  const handleReset = () => {
    setBarWeight(45);
    setIsLoadedEvenly(false);
    setSelectedPlateWeight("45");
    setPlateQuantity("");
    setPlatesAdded([]);
    setTotalWeight(null);
    setError("");
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Bar Weight Calculator
      </h2>

      {/* Bar Weight Selector */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-white">
          Bar Weight (lbs)
        </label>
        <div className="flex gap-2">
          {[25, 35, 45].map((weight) => (
            <button
              key={weight}
              onClick={() => setBarWeight(weight)}
              className={`flex-1 py-2 rounded font-semibold transition ${
                barWeight === weight
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {weight}
            </button>
          ))}
        </div>
      </div>

      {/* Loaded Evenly Toggle */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => setIsLoadedEvenly(!isLoadedEvenly)}
          style={{
            backgroundColor: isLoadedEvenly ? "#16a34a" : "#475569",
            transition: "background-color 0.3s",
          }}
          className="relative inline-flex h-8 w-14 items-center rounded-full"
        >
          <span
            style={{
              transform: isLoadedEvenly
                ? "translateX(28px)"
                : "translateX(4px)",
              transition: "transform 0.3s",
            }}
            className="inline-block h-6 w-6 rounded-full bg-white"
          />
        </button>
        <label className="text-sm font-semibold text-white cursor-pointer">
          Loaded evenly?
        </label>
      </div>

      {/* Plate Input Section */}
      <div className="bg-slate-700 rounded p-4 mb-6">
        <p className="text-sm font-semibold text-white mb-3">
          {isLoadedEvenly ? "Add plates for ONE side:" : "Add plates:"}
        </p>

        <div className="flex gap-2 mb-3">
          <select
            value={selectedPlateWeight}
            onChange={(e) => setSelectedPlateWeight(e.target.value)}
            className="flex-1 bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
          >
            {standardPlates.map((plate) => (
              <option key={plate} value={plate}>
                {plate} lbs
              </option>
            ))}
          </select>

          <input
            type="number"
            value={plateQuantity}
            onChange={(e) => setPlateQuantity(e.target.value)}
            placeholder="Qty"
            className="w-20 bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white placeholder-slate-400"
          />

          <button
            onClick={addPlate}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded transition"
          >
            + Add
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/50 border border-red-600 rounded p-2 mb-3">
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* Plates List */}
      {platesAdded.length > 0 && (
        <div className="bg-slate-700 rounded p-4 mb-6">
          <p className="text-sm font-semibold text-white mb-3">
            {isLoadedEvenly ? "Plates on one side:" : "Plates added:"}
          </p>
          <div className="space-y-2">
            {platesAdded.map((plate) => (
              <div
                key={plate.id}
                className="flex justify-between items-center bg-slate-600 p-2 rounded text-sm"
              >
                <span className="text-white">
                  {plate.weight} lbs × {plate.quantity}
                </span>
                <button
                  onClick={() => removePlate(plate.id)}
                  className="text-red-400 hover:text-red-300 font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={calculateTotalWeight}
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

      {/* Results */}
      {totalWeight !== null && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-center">
          <p className="text-sm text-purple-100 mb-2">Total Bar Weight</p>
          <p className="text-5xl font-bold text-white">{totalWeight} lbs</p>
          <p className="text-sm text-purple-200 mt-3">
            {isLoadedEvenly ? "(plates × 2 sides)" : "(as loaded)"}
          </p>
        </div>
      )}
    </div>
  );
}
