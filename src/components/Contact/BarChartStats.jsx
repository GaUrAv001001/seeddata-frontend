// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// // Register the necessary Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// export default function Contact() {
//   const [chartData, setChartData] = useState(null);
//   const [month, setMonth] = useState('');
//   const [error, setError] = useState(null);

//   // List of months for selection
//   const months = [
//     { label: 'January', value: 'January' },
//     { label: 'February', value: 'February' },
//     { label: 'March', value: 'March' },
//     { label: 'April', value: 'April' },
//     { label: 'May', value: 'May' },
//     { label: 'June', value: 'June' },
//     { label: 'July', value: 'July' },
//     { label: 'August', value: 'August' },
//     { label: 'September', value: 'September' },
//     { label: 'October', value: 'October' },
//     { label: 'November', value: 'November' },
//     { label: 'December', value: 'December' },
//   ];

//   // Fetch the bar chart data when the month is selected or on component mount
//   useEffect(() => {
//     const currentMonth = new Date().toLocaleString('default', { month: 'long' });
//     setMonth(currentMonth);
//     fetchChartData(currentMonth);
//   }, []);

//   const fetchChartData = async (selectedMonth) => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/v2/transaction/barchartdata', {
//         params: { month: selectedMonth },
//       });
//       const data = response.data.data;
//       setChartData({
//         labels: data.map(item => item.range), // The range (e.g., '0-100', '101-200')
//         datasets: [
//           {
//             label: 'Sales Count',
//             data: data.map(item => item.count), // The count for each range
//             backgroundColor: 'rgba(75, 192, 192, 0.6)',
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 1,
//           },
//         ],
//       });
//       setError(null);
//     } catch (error) {
//       console.error('Error fetching bar chart data:', error);
//       setError('Failed to fetch data for bar chart');
//       setChartData(null);
//     }
//   };

//   // Handle month selection change
//   const handleMonthChange = (event) => {
//     const selectedMonth = event.target.value;
//     setMonth(selectedMonth);
//     fetchChartData(selectedMonth);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Sales Bar Chart</h1>

//       {/* Month Selector */}
//       <div className="mb-4">
//         <label htmlFor="month" className="block text-sm font-medium text-gray-700">Select a Month</label>
//         <select
//           id="month"
//           name="month"
//           value={month}
//           onChange={handleMonthChange}
//           className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//         >
//           {months.map((monthOption) => (
//             <option key={monthOption.value} value={monthOption.value}>
//               {monthOption.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Display Error */}
//       {error && <p className="text-red-500 mt-4">{error}</p>}

//       {/* Display Bar Chart */}
//       {chartData && (
//         <div className="mt-4">
//           <Bar
//             data={chartData}
//             options={{
//               responsive: true,
//               plugins: {
//                 legend: {
//                   position: 'top',
//                 },
//                 title: {
//                   display: true,
//                   text: `Sales Count for ${month}`,
//                 },
//               },
//               scales: {
//                 y: {
//                   beginAtZero: true,
//                 },
//               },
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }


// code 3

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChartStats() {
  const [chartData, setChartData] = useState(null);
  const [month, setMonth] = useState('');
  const [error, setError] = useState(null);

  // List of months for selection
  const months = Array.from({ length: 12 }, (_, index) => {
    return {
      label: new Date(0, index).toLocaleString('default', { month: 'long' }),
      value: new Date(0, index).toLocaleString('default', { month: 'long' }),
    };
  });

  // Fetch the bar chart data when the month is selected or on component mount
  useEffect(() => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    setMonth(currentMonth);
    fetchChartData(currentMonth);
  }, []);

  const fetchChartData = async (selectedMonth) => {
    try {
      const response = await axios.get('http://localhost:8000/api/v2/transaction/barchartdata', {
        params: { month: selectedMonth },
      });
      const data = response.data.data;
      setChartData({
        labels: data.map(item => item.range), // The range (e.g., '0-100', '101-200')
        datasets: [
          {
            label: 'Sales Count',
            data: data.map(item => item.count), // The count for each range
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
      setError(null);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
      setError('Failed to fetch data for bar chart');
      setChartData(null);
    }
  };

  // Handle month selection change
  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    setMonth(selectedMonth);
    fetchChartData(selectedMonth);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Sales Bar Chart</h1>

      {/* Month Selector */}
      <div className="mb-4">
        <label htmlFor="month" className="block text-sm font-medium text-gray-700">Select a Month</label>
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

      {/* Display Error */}
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {/* Display Bar Chart */}
      {chartData && (
        <div className="mt-4">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
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
          />
        </div>
      )}
    </div>
  );
}
