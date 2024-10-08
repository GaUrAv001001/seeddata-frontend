import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const API_URL = import.meta.env.VITE_API_URL;
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChartStats() {
  const [chartData, setChartData] = useState(null);
  const [month, setMonth] = useState("");
  const [error, setError] = useState(null);

  const months = Array.from({ length: 12 }, (_, index) => {
    return {
      label: new Date(0, index).toLocaleString("default", { month: "long" }),
      value: new Date(0, index).toLocaleString("default", { month: "long" }),
    };
  });

  // Fetch the bar chart data when the month is selected or on component mount
  useEffect(() => {
    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
    });
    setMonth(currentMonth);
    fetchChartData(currentMonth);
  }, []);

  const fetchChartData = async (selectedMonth) => {
    try {
      const response = await axios.get(`${API_URL}/barchartdata`, {
        params: { month: selectedMonth },
      });
      const data = response.data.data;
      setChartData({
        labels: data.map((item) => item.range),
        datasets: [
          {
            label: "Sales Count",
            data: data.map((item) => item.count),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
      setError(null);
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
      setError("Failed to fetch data for bar chart");
      setChartData(null);
    }
  };

  // handleMonthChange
  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    setMonth(selectedMonth);
    fetchChartData(selectedMonth);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Sales Bar Chart</h1>

      {/* ------- Select month ----- */}
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

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {/* ------- Chart data ----- */}
      {chartData && (
        <div className="mt-4">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false, // This helps the chart to adjust its height and width dynamically
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: `Sales Count for ${month}`,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
            height={400} // Height can be adjusted for better responsiveness
          />
        </div>
      )}
    </div>
  );
}
