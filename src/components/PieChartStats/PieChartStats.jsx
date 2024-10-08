// import React, { useEffect, useState } from 'react';
// import { Pie } from 'react-chartjs-2';
// import axios from 'axios';
// import 'chart.js/auto';

// export default function PieChartStats() {
//     const [chartData, setChartData] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [selectedMonth, setSelectedMonth] = useState('September');

//     const months = [
//         { label: 'January', value: 'January' },
//         { label: 'February', value: 'February' },
//         { label: 'March', value: 'March' },
//         { label: 'April', value: 'April' },
//         { label: 'May', value: 'May' },
//         { label: 'June', value: 'June' },
//         { label: 'July', value: 'July' },
//         { label: 'August', value: 'August' },
//         { label: 'September', value: 'September' },
//         { label: 'October', value: 'October' },
//         { label: 'November', value: 'November' },
//         { label: 'December', value: 'December' },
//     ];

//     const fetchPieChartData = async (month) => {
//         try {
//             setLoading(true);
//             const response = await axios.get(`http://localhost:8000/api/v2/transaction/pieChartdata?month=${month}`);
//             const { data } = response.data;

//             const categories = data.map(item => item.categoryName);
//             const counts = data.map(item => item.count);

//             setChartData({
//                 labels: categories,
//                 datasets: [
//                     {
//                         label: 'Transactions by Category',
//                         data: counts,
//                         backgroundColor: [
//                             'rgba(255, 99, 132, 0.6)',
//                             'rgba(54, 162, 235, 0.6)',
//                             'rgba(255, 206, 86, 0.6)',
//                             'rgba(75, 192, 192, 0.6)',
//                             'rgba(153, 102, 255, 0.6)',
//                             'rgba(255, 159, 64, 0.6)',
//                         ],
//                         borderWidth: 1,
//                     },
//                 ],
//             });
//             setLoading(false);
//         } catch (err) {
//             setError('Failed to fetch pie chart data');
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchPieChartData(selectedMonth);
//     }, [selectedMonth]);

//     const handleMonthChange = (e) => {
//         setSelectedMonth(e.target.value);
//     };

//     if (loading) {
//         return <div className="text-center">Loading...</div>;
//     }

//     if (error) {
//         return <div className="text-red-600 text-center">{error}</div>;
//     }

//     return (
//         <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg mt-6">
//             <h2 className="text-2xl font-bold mb-8 text-start">Transactions by Category</h2>
//             <div className="mb-4">
//             <select
//                 value={selectedMonth}
//                 onChange={handleMonthChange}
//                 // className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
//           className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

//             >
//                 {months.map(month => (
//                     <option key={month.value} value={month.value}>
//                         {month.label}
//                     </option>
//                 ))}
//             </select>
//             </div>

//             <Pie data={chartData} />
//         </div>
//     );
// }


// code 2

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';

export default function PieChartStats() {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // List of months
    const months = [
        { label: 'January', value: 'January' },
        { label: 'February', value: 'February' },
        { label: 'March', value: 'March' },
        { label: 'April', value: 'April' },
        { label: 'May', value: 'May' },
        { label: 'June', value: 'June' },
        { label: 'July', value: 'July' },
        { label: 'August', value: 'August' },
        { label: 'September', value: 'September' },
        { label: 'October', value: 'October' },
        { label: 'November', value: 'November' },
        { label: 'December', value: 'December' },
    ];

    // Get current month
    const currentMonth = months[new Date().getMonth()].value;

    const [selectedMonth, setSelectedMonth] = useState(currentMonth); // Set current month as default

    const fetchPieChartData = async (month) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8000/api/v2/transaction/pieChartdata?month=${month}`);
            const { data } = response.data;

            const categories = data.map(item => item.categoryName);
            const counts = data.map(item => item.count);

            setChartData({
                labels: categories,
                datasets: [
                    {
                        label: 'Transactions by Category',
                        data: counts,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                        ],
                        borderWidth: 1,
                    },
                ],
            });
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch pie chart data');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPieChartData(selectedMonth);
    }, [selectedMonth]);

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-600 text-center">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg mt-6">
            <h2 className="text-2xl font-bold mb-8 text-start">Transactions by Category</h2>
            <div className="mb-4">
                <select
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    {months.map(month => (
                        <option key={month.value} value={month.value}>
                            {month.label}
                        </option>
                    ))}
                </select>
            </div>

            <Pie data={chartData} />
        </div>
    );
}
