// import React, { useEffect, useState } from "react";
// import About from "../About/About";
// import Contact from "../Contact/Contact";
// import PieChartStats from "../Github/PieChartStats";

// export default function TransactionList() {
//   const [transactions, setTransactions] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [perPage, setPerPage] = useState(10);
//   const [totalCount, setTotalCount] = useState(0);
//   const [search, setSearch] = useState("");
//   const [month, setMonth] = useState("october"); // Default selected month
//   const [totalPages, setTotalPages] = useState(0);

//   // Function to fetch transactions based on month and search
//   const fetchTransactions = async () => {
//     const response = await fetch(`http://localhost:8000/api/v2/transaction?page=${currentPage}&perPage=${perPage}&month=${month}`);
//     const data = await response.json();
//     if (data.success) {
//       setTransactions(data.data.transactions);
//       setTotalCount(data.data.totalCount);
//       setTotalPages(data.data.totalPages);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions(); // Fetch transactions when component mounts or when currentPage/month changes
//   }, [currentPage, month]);

//   useEffect(() => {
//     // Reset to the first page when search changes
//     setCurrentPage(1);
//     fetchTransactions();
//   }, [search]); // Trigger this effect when search changes

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//   };

//   const handleMonthChange = (e) => {
//     setMonth(e.target.value);
//     // Reset to the first page when month changes
//     setCurrentPage(1);
//   };

//   // Filter transactions based on search input
//   const filteredTransactions = transactions.filter(transaction => {
//     const matchesSearch =
//       transaction.title.toLowerCase().includes(search.toLowerCase()) ||
//       transaction.description.toLowerCase().includes(search.toLowerCase()) ||
//       transaction.price.toString().includes(search); // Ensure price is compared as a string

//     return matchesSearch; // Filter only based on search input
//   });

//   // Calculate the starting index for pagination
//   const startIndex = (currentPage - 1) * perPage;

//   // Paginate the filtered transactions
//   const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + perPage);

//   // Calculate total pages based on filtered transactions
//   const totalFilteredPages = Math.ceil(filteredTransactions.length / perPage);

//   return (
//     <>
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Transaction List</h1>

//       <div className="mb-4">
//         <input 
//           type="text" 
//           placeholder="Search..." 
//           value={search} 
//           onChange={handleSearchChange} 
//           className="border p-2"
//         />
//         <select 
//           value={month} 
//           onChange={handleMonthChange} 
//           className="border p-2 ml-2"
//         >
//           <option value="january">January</option>
//           <option value="february">February</option>
//           <option value="march">March</option>
//           <option value="april">April</option>
//           <option value="may">May</option>
//           <option value="june">June</option>
//           <option value="july">July</option>
//           <option value="august">August</option>
//           <option value="september">September</option>
//           <option value="october">October</option>
//           <option value="november">November</option>
//           <option value="december">December</option>
//         </select>
//       </div>

//       <table className="min-w-full border-collapse border border-gray-200">
//         <thead>
//           <tr>
//             <th className="border border-gray-200 p-2">ID</th>
//             <th className="border border-gray-200 p-2">Title</th>
//             <th className="border border-gray-200 p-2">Description</th>
//             <th className="border border-gray-200 p-2">Price</th>
//             <th className="border border-gray-200 p-2">Category</th>
//             <th className="border border-gray-200 p-2">Sold</th>
//             <th className="border border-gray-200 p-2">Image</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedTransactions.map(transaction => (
//             <tr key={transaction.id}>
//               <td className="border border-gray-200 p-2">{transaction.id}</td>
//               <td className="border border-gray-200 p-2">{transaction.title}</td>
//               <td className="border border-gray-200 p-2">{transaction.description}</td>
//               <td className="border border-gray-200 p-2">{transaction.price}</td>
//               <td className="border border-gray-200 p-2">{transaction.category}</td>
//               <td className="border border-gray-200 p-2">{transaction.sold ? "Yes" : "No"}</td>
//               <td className="border border-gray-200 p-2">
//                 <img src={transaction.image} alt={transaction.title} className="h-16 w-16 object-cover" />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="flex justify-between mt-4">
//         <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-gray-300 p-2 rounded">Previous</button>
//         <span>Page {currentPage} of {totalFilteredPages}</span>
//         <button onClick={handleNextPage} disabled={currentPage === totalFilteredPages} className="bg-gray-300 p-2 rounded">Next</button>
//       </div>
//     </div>
//     <About/>
//     <Contact/>
//     <PieChartStats/>
//     </>
//   );
// }





// code 2

// import React, { useEffect, useState } from "react";
// import About from "../About/About";
// import Contact from "../Contact/Contact";
// import PieChartStats from "../Github/PieChartStats";

// export default function TransactionList() {
//   const [transactions, setTransactions] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [perPage, setPerPage] = useState(10);
//   const [totalCount, setTotalCount] = useState(0);
//   const [search, setSearch] = useState("");
//   const [month, setMonth] = useState("october");
//   const [totalPages, setTotalPages] = useState(0);

//   const fetchTransactions = async () => {
//     const response = await fetch(`http://localhost:8000/api/v2/transaction?page=${currentPage}&perPage=${perPage}&month=${month}`);
//     const data = await response.json();
//     if (data.success) {
//       setTransactions(data.data.transactions);
//       setTotalCount(data.data.totalCount);
//       setTotalPages(data.data.totalPages);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, [currentPage, month]);

//   useEffect(() => {
//     setCurrentPage(1);
//     fetchTransactions();
//   }, [search]);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//   };

//   const handleMonthChange = (e) => {
//     setMonth(e.target.value);
//     setCurrentPage(1);
//   };

//   const filteredTransactions = transactions.filter(transaction => {
//     const matchesSearch =
//       transaction.title.toLowerCase().includes(search.toLowerCase()) ||
//       transaction.description.toLowerCase().includes(search.toLowerCase()) ||
//       transaction.price.toString().includes(search);

//     return matchesSearch;
//   });

//   const startIndex = (currentPage - 1) * perPage;
//   const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + perPage);
//   const totalFilteredPages = Math.ceil(filteredTransactions.length / perPage);

//   return (
//     <>
//       <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
//         <h1 className="text-3xl font-semibold mb-4 text-gray-800">Transaction List</h1>

//         <div className="mb-4 flex items-center">
//           <input 
//             type="text" 
//             placeholder="Search..." 
//             value={search} 
//             onChange={handleSearchChange} 
//             className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <select 
//             value={month} 
//             onChange={handleMonthChange} 
//             className="border border-gray-300 p-2 rounded-md ml-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="january">January</option>
//             <option value="february">February</option>
//             <option value="march">March</option>
//             <option value="april">April</option>
//             <option value="may">May</option>
//             <option value="june">June</option>
//             <option value="july">July</option>
//             <option value="august">August</option>
//             <option value="september">September</option>
//             <option value="october">October</option>
//             <option value="november">November</option>
//             <option value="december">December</option>
//           </select>
//         </div>

//         <table className="min-w-full border-collapse border border-gray-300 bg-gray-100 rounded-lg overflow-hidden">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="border border-gray-300 p-3 text-left">ID</th>
//               <th className="border border-gray-300 p-3 text-left">Title</th>
//               <th className="border border-gray-300 p-3 text-left">Description</th>
//               <th className="border border-gray-300 p-3 text-left">Price</th>
//               <th className="border border-gray-300 p-3 text-left">Category</th>
//               <th className="border border-gray-300 p-3 text-left">Sold</th>
//               <th className="border border-gray-300 p-3 text-left">Image</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedTransactions.map(transaction => (
//               <tr key={transaction.id} className="hover:bg-gray-200 transition duration-200">
//                 <td className="border border-gray-300 p-2">{transaction.id}</td>
//                 <td className="border border-gray-300 p-2">{transaction.title}</td>
//                 <td className="border border-gray-300 p-2">{transaction.description}</td>
//                 <td className="border border-gray-300 p-2">${transaction.price}</td>
//                 <td className="border border-gray-300 p-2">{transaction.category}</td>
//                 <td className="border border-gray-300 p-2">{transaction.sold ? "Yes" : "No"}</td>
//                 <td className="border border-gray-300 p-2">
//                   <img src={transaction.image} alt={transaction.title} className="h-16 w-16 object-cover rounded"/>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="flex justify-between mt-4">
//           <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-gray-300 p-2 rounded-md hover:bg-gray-400 transition duration-200">Previous</button>
//           <span className="self-center">Page {currentPage} of {totalFilteredPages}</span>
//           <button onClick={handleNextPage} disabled={currentPage === totalFilteredPages} className="bg-gray-300 p-2 rounded-md hover:bg-gray-400 transition duration-200">Next</button>
//         </div>
//       </div>

//       <About/>
//       <Contact/>
//       <PieChartStats/>
//     </>
//   );
// }


// code 3

import React, { useEffect, useState } from "react";
import Statistics from "../About/Statistics";
import Contact from "../Contact/BarChartStats";
import PieChartStats from "../Github/PieChartStats";
// Import the BarChartStats component
import BarChartStats from "../Contact/BarChartStats"; // Ensure you have this component

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("october");
  const [totalPages, setTotalPages] = useState(0);

  const fetchTransactions = async () => {
    const response = await fetch(`http://localhost:8000/api/v2/transaction?page=${currentPage}&perPage=${perPage}&month=${month}`);
    const data = await response.json();
    if (data.success) {
      setTransactions(data.data.transactions);
      setTotalCount(data.data.totalCount);
      setTotalPages(data.data.totalPages);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage, month]);

  useEffect(() => {
    setCurrentPage(1);
    fetchTransactions();
  }, [search]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setCurrentPage(1);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch =
      transaction.title.toLowerCase().includes(search.toLowerCase()) ||
      transaction.description.toLowerCase().includes(search.toLowerCase()) ||
      transaction.price.toString().includes(search);

    return matchesSearch;
  });

  const startIndex = (currentPage - 1) * perPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + perPage);
  const totalFilteredPages = Math.ceil(filteredTransactions.length / perPage);

  return (
    <>
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold mb-4 text-gray-800">Transaction List</h1>

        <div className="mb-4 flex items-center">
          <input 
            type="text" 
            placeholder="Search..." 
            value={search} 
            onChange={handleSearchChange} 
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select 
            value={month} 
            onChange={handleMonthChange} 
            className="border border-gray-300 p-2 rounded-md ml-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="january">January</option>
            <option value="february">February</option>
            <option value="march">March</option>
            <option value="april">April</option>
            <option value="may">May</option>
            <option value="june">June</option>
            <option value="july">July</option>
            <option value="august">August</option>
            <option value="september">September</option>
            <option value="october">October</option>
            <option value="november">November</option>
            <option value="december">December</option>
          </select>
        </div>

        <table className="min-w-full border-collapse border border-gray-300 bg-gray-100 rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-3 text-left">ID</th>
              <th className="border border-gray-300 p-3 text-left">Title</th>
              <th className="border border-gray-300 p-3 text-left">Description</th>
              <th className="border border-gray-300 p-3 text-left">Price</th>
              <th className="border border-gray-300 p-3 text-left">Category</th>
              <th className="border border-gray-300 p-3 text-left">Sold</th>
              <th className="border border-gray-300 p-3 text-left">Image</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map(transaction => (
              <tr key={transaction.id} className="hover:bg-gray-200 transition duration-200">
                <td className="border border-gray-300 p-2">{transaction.id}</td>
                <td className="border border-gray-300 p-2">{transaction.title}</td>
                <td className="border border-gray-300 p-2">{transaction.description}</td>
                <td className="border border-gray-300 p-2">₹{transaction.price}</td>
                <td className="border border-gray-300 p-2">{transaction.category}</td>
                <td className="border border-gray-300 p-2">{transaction.sold ? "Yes" : "No"}</td>
                <td className="border border-gray-300 p-2">
                  <img src={transaction.image} alt={transaction.title} className="h-16 w-16 object-cover rounded"/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-4">
          <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-gray-300 p-2 rounded-md hover:bg-gray-400 transition duration-200">Previous</button>
          <span className="self-center">Page {currentPage} of {totalFilteredPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalFilteredPages} className="bg-gray-300 p-2 rounded-md hover:bg-gray-400 transition duration-200">Next</button>
        </div>
      </div>

      {/* Flex container for charts */}
      <div className="flex justify-center mt-6 space-x-4 p-6">
        <div className="w-1/2">
        <PieChartStats />
        </div>
        <div className="w-1/2">
        <div className="">
        <BarChartStats />
        </div>
        <div className="mt-10">
        <Statistics />
        </div>
        </div>
      </div>
      {/* <About /> */}
      {/* <Contact />  */}
    </>
  );
}
