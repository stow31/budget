import React, { useState } from "react";

const ProgressBar: React.FC = () => {
  const [total, setTotal] = useState<number>(100);
  const [value, setValue] = useState<number>(50);

  const percentage = total > 0 ? Math.min((value / total) * 100, 100) : 0;

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Total Value</label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded p-2"
          value={total}
          onChange={(e) => setTotal(Number(e.target.value))}
          min={0}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Current Value</label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded p-2"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          min={0}
        />
      </div>

      <div>
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="text-center mt-2 text-sm text-gray-700">
          {percentage.toFixed(1)}%
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;
