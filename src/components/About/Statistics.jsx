// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function About() {
//   const [month, setMonth] = useState('');
//   const [statistics, setStatistics] = useState(null);
//   const [error, setError] = useState(null);

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

//   // Automatically fetch statistics for the current month when the component mounts
//   useEffect(() => {
//     const currentMonth = new Date().toLocaleString('default', { month: 'long' });
//     setMonth(currentMonth);
//     fetchStatistics(currentMonth);
//   }, []);

//   const fetchStatistics = async (selectedMonth) => {
//     console.log('Fetching statistics for month:', selectedMonth); // Debug: Check if function is called
//     try {
//       const response = await axios.get('http://localhost:8000/api/v2/transaction/statistics', {
//         params: { month: selectedMonth }, // Passes the selected month as a query parameter
//       });
//       console.log('API Response:', response.data); // Debug: Check API response
//       setStatistics(response.data.data);
//       setError(null);
//     } catch (error) {
//       console.error('Error fetching statistics:', error); // Debug: Check error
//       setError('Failed to fetch statistics');
//       setStatistics(null);
//     }
//   };

//   // Handle month selection change
//   const handleMonthChange = (event) => {
//     const selectedMonth = event.target.value;
//     setMonth(selectedMonth);
//     fetchStatistics(selectedMonth); // Fetch new statistics when month changes
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Sales Statistics</h1>

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

//       {/* Display Statistics */}
//       {statistics && (
//         <div className="mt-4">
//           <h2 className="text-xl font-semibold">Statistics for {month}</h2>
//           <p>Total Sold Items: {statistics.totalSoldItems}</p>
//           <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
//           <p>Total Sales Amount: ${statistics.totalSalesAmount}</p>
//         </div>
//       )}
//     </div>
//   );
// }


// code 2

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function About() {
//   const [month, setMonth] = useState('');
//   const [statistics, setStatistics] = useState(null);
//   const [error, setError] = useState(null);

//   const months = Array.from({ length: 12 }, (_, index) => {
//     return {
//       label: new Date(0, index).toLocaleString('default', { month: 'long' }),
//       value: new Date(0, index).toLocaleString('default', { month: 'long' }),
//     };
//   });

//   // Automatically fetch statistics for the current month when the component mounts
//   useEffect(() => {
//     const currentMonth = new Date().toLocaleString('default', { month: 'long' });
//     setMonth(currentMonth);
//     fetchStatistics(currentMonth);
//   }, []);

//   const fetchStatistics = async (selectedMonth) => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/v2/transaction/statistics', {
//         params: { month: selectedMonth },
//       });
//       setStatistics(response.data.data);
//       setError(null);
//     } catch (error) {
//       console.error('Error fetching statistics:', error);
//       setError('Failed to fetch statistics');
//       setStatistics(null);
//     }
//   };

//   // Handle month selection change
//   const handleMonthChange = (event) => {
//     const selectedMonth = event.target.value;
//     setMonth(selectedMonth);
//     fetchStatistics(selectedMonth);
//   };

//   return (
//     <div className="p-4 bg-gray-50 rounded-md shadow-md">
//       <h1 className="text-2xl font-bold mb-4 text-center">Sales Statistics</h1>

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
//       {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

//       {/* Display Statistics */}
//       {statistics && (
//         <div className="mt-4">
//           <h2 className="text-xl font-semibold text-center">Statistics for {month}</h2>
//           <p className="text-center">Total Sold Items: {statistics.totalSoldItems}</p>
//           <p className="text-center">Total Not Sold Items: {statistics.totalNotSoldItems}</p>
//           <p className="text-center">Total Sales Amount: ${statistics.totalSalesAmount}</p>
//         </div>
//       )}
//     </div>
//   );
// }


// code 3

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart, FaRegFrown, FaMoneyBillWave } from 'react-icons/fa'; // Importing icons

export default function Statistics() {
  const [month, setMonth] = useState('');
  const [statistics, setStatistics] = useState(null);
  const [error, setError] = useState(null);

  const months = Array.from({ length: 12 }, (_, index) => {
    return {
      label: new Date(0, index).toLocaleString('default', { month: 'long' }),
      value: new Date(0, index).toLocaleString('default', { month: 'long' }),
    };
  });

  useEffect(() => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    setMonth(currentMonth);
    fetchStatistics(currentMonth);
  }, []);

  const fetchStatistics = async (selectedMonth) => {
    try {
      const response = await axios.get('http://localhost:8000/api/v2/transaction/statistics', {
        params: { month: selectedMonth },
      });
      setStatistics(response.data.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching statistics:', error);
      setError('Failed to fetch statistics');
      setStatistics(null);
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

      {/* Display Statistics */}
      {statistics && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-md flex items-center justify-center">
            <FaShoppingCart className="text-green-500 text-3xl mr-2" />
            <div>
              <h3 className="text-xl font-semibold text-center">Total Sold Items</h3>
              <p className="text-center">{statistics.totalSoldItems}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md flex items-center justify-center">
            <FaRegFrown className="text-red-500 text-3xl mr-2" />
            <div>
              <h3 className="text-xl font-semibold text-center">Total Not Sold Items</h3>
              <p className="text-center">{statistics.totalNotSoldItems}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md flex items-center justify-center">
            <FaMoneyBillWave className="text-blue-500 text-3xl mr-2" />
            <div>
              <h3 className="text-xl font-semibold text-center">Total Sales Amount</h3>
              <p className="text-center">₹{statistics.totalSalesAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
