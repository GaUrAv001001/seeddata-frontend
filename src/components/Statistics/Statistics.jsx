import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaShoppingCart, FaRegFrown, FaMoneyBillWave } from "react-icons/fa"; // Importing icons
const API_URL = import.meta.env.VITE_API_URL;

export default function Statistics() {
  const [month, setMonth] = useState("");
  const [statistics, setStatistics] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const months = Array.from({ length: 12 }, (_, index) => {
    return {
      label: new Date(0, index).toLocaleString("default", { month: "long" }),
      value: new Date(0, index).toLocaleString("default", { month: "long" }),
    };
  });

  useEffect(() => {
    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
    });
    setMonth(currentMonth);
    fetchStatistics(currentMonth);
  }, []);

  const fetchStatistics = async (selectedMonth) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/statistics`, {
        params: { month: selectedMonth },
      });
      setStatistics(response.data.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching statistics:", error);
      setError("Failed to fetch statistics");
      setStatistics(null);
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    setMonth(selectedMonth);
    fetchStatistics(selectedMonth);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Sales Statistics</h1>

      <div className="mb-4">
        <label
          htmlFor="month"
          className="block text-sm font-medium text-gray-700"
        >
          Select a Month
        </label>
        <select
          id="month"
          name="month"
          value={month}
          onChange={handleMonthChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {months.map((monthOption) => (
            <option key={monthOption.value} value={monthOption.value}>
              {monthOption.label}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"></div>
        </div>
      )}

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {statistics && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-md flex items-center justify-center">
            <FaShoppingCart className="text-green-500 text-3xl mr-2" />
            <div>
              <h3 className="text-xl font-semibold text-center">
                Total Sold Items
              </h3>
              <p className="text-center">{statistics.totalSoldItems}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md flex items-center justify-center">
            <FaRegFrown className="text-red-500 text-3xl mr-2" />
            <div>
              <h3 className="text-xl font-semibold text-center">
                Total Not Sold Items
              </h3>
              <p className="text-center">{statistics.totalNotSoldItems}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md flex items-center justify-center">
            <FaMoneyBillWave className="text-blue-500 text-3xl mr-2" />
            <div>
              <h3 className="text-xl font-semibold text-center">
                Total Sales Amount
              </h3>
              <p className="text-center">
                ₹{statistics.totalSalesAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
