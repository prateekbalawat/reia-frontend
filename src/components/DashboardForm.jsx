// src/components/DashboardForm.jsx
import React from "react";

const DashboardForm = ({
  area,
  city,
  investment,
  loading,
  error,
  setArea,
  setInvestment,
  handleSubmit,
  handleClear,
  hasResult,
}) => {
  const areas = [
    "Whitefield",
    "JP Nagar",
    "BTM Layout",
    "MG Road",
    "Indiranagar",
    "Electronic City",
    "Devanahalli",
    "KR Puram",
    "Vidyaranyapura",
    "HSR Layout",
  ];
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 rounded-xl shadow-md"
    >
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">City</label>
          <select
            value={city}
            disabled
            className="w-full border px-4 py-2 rounded-md bg-gray-100 cursor-not-allowed"
          >
            <option value="Bangalore">Bangalore</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Area</label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
          >
            {areas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Investment Amount (₹)
        </label>
        <input
          type="number"
          value={investment}
          onChange={(e) => setInvestment(e.target.value)}
          className="w-full border px-4 py-2 rounded-md"
          placeholder="Enter amount in INR"
        />
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md">
          {error}
        </div>
      )}

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {loading ? "Calculating..." : "Submit"}
        </button>
        {hasResult && (
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Clear Result
          </button>
        )}
      </div>
    </form>
  );
};

export default DashboardForm;
