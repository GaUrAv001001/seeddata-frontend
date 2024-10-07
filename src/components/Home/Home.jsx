// import React, { useEffect, useState } from "react";

// export default function Home() {
//   const [transactions, setTransactions] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [perPage, setPerPage] = useState(10);
//   const [totalCount, setTotalCount] = useState(0);
//   const [search, setSearch] = useState("");
//   const [month, setMonth] = useState("");
//   const [totalPages, setTotalPages] = useState(0);

//   const fetchTransactions = async () => {
//     const response = await fetch(`http://localhost:8000/api/v2/transaction?page=${currentPage}&perPage=${perPage}&search=${search}&month=${month}`);
//     const data = await response.json();
//     if (data.success) {
//       setTransactions(data.data.transactions);
//       setTotalCount(data.data.totalCount);
//       setTotalPages(data.data.totalPages);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, [currentPage, search, month]); // Re-fetch data when these values change

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
//     setCurrentPage(1); // Reset to the first page on search
//   };

//   const handleMonthChange = (e) => {
//     setMonth(e.target.value);
//     setCurrentPage(1); // Reset to the first page on month change
//   };

//   return (
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
//           <option value="">Select Month</option>
//           {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
//             <option key={index} value={month.toLowerCase()}>{month}</option>
//           ))}
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
//           {transactions.map(transaction => (
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
//         <span>Page {currentPage} of {totalPages}</span>
//         <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-gray-300 p-2 rounded">Next</button>
//       </div>
//     </div>
//   );
// }



// code 2

// import React, { useEffect, useState } from "react";

// export default function Home() {
//   const [transactions, setTransactions] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [perPage, setPerPage] = useState(10);
//   const [totalCount, setTotalCount] = useState(0);
//   const [search, setSearch] = useState("");
//   const [month, setMonth] = useState("");
//   const [totalPages, setTotalPages] = useState(0);

//   const fetchTransactions = async () => {
//     const response = await fetch(
//       `http://localhost:8000/api/v2/transaction?page=${currentPage}&perPage=${perPage}&month=${month}`
//     );
//     const data = await response.json();
//     if (data.success) {
//       const filteredTransactions = data.data.transactions.filter(transaction => {
//         const searchLower = search.toLowerCase();
//         return (
//           transaction.title.toLowerCase().includes(searchLower) ||
//           transaction.description.toLowerCase().includes(searchLower) ||
//           transaction.price.toString().includes(searchLower) // Convert price to string for comparison
//         );
//       });

//       setTransactions(filteredTransactions);
//       setTotalCount(filteredTransactions.length);
//       setTotalPages(Math.ceil(filteredTransactions.length / perPage));
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, [currentPage, search, month]); // Re-fetch data when these values change

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
//     setCurrentPage(1); // Reset to the first page on search
//   };

//   const handleMonthChange = (e) => {
//     setMonth(e.target.value);
//     setCurrentPage(1); // Reset to the first page on month change
//   };

//   return (
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
//           <option value="">Select Month</option>
//           {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
//             <option key={index} value={month.toLowerCase()}>{month}</option>
//           ))}
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
//           {transactions.map(transaction => (
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
//         <span>Page {currentPage} of {totalPages}</span>
//         <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-gray-300 p-2 rounded">Next</button>
//       </div>
//     </div>
//   );
// }




// code 3

// import React, { useEffect, useState } from "react";

// export default function Home() {
//   const [transactions, setTransactions] = useState([]);
//   const [filteredTransactions, setFilteredTransactions] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [perPage, setPerPage] = useState(10);
//   const [totalCount, setTotalCount] = useState(0);
//   const [search, setSearch] = useState("");
//   const [month, setMonth] = useState("");
//   const [totalPages, setTotalPages] = useState(0);

//   const fetchTransactions = async () => {
//     const response = await fetch(
//       `http://localhost:8000/api/v2/transaction?page=${currentPage}&perPage=${perPage}&month=${month}`
//     );
//     const data = await response.json();
//     if (data.success) {
//       setTransactions(data.data.transactions);
//       setTotalCount(data.data.transactions.length);
//       setTotalPages(Math.ceil(data.data.transactions.length / perPage));
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, [currentPage, month]); // Re-fetch data when these values change

//   useEffect(() => {
//     const searchLower = search.toLowerCase();
//     const filtered = transactions.filter(transaction => {
//       return (
//         transaction.title.toLowerCase().includes(searchLower) ||
//         transaction.description.toLowerCase().includes(searchLower) ||
//         transaction.price.toString().includes(searchLower)
//       );
//     });

//     setFilteredTransactions(filtered);
//     setTotalCount(filtered.length);
//     setTotalPages(Math.ceil(filtered.length / perPage));
//     setCurrentPage(1); // Reset to the first page when filtering
//   }, [search, transactions]);

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
//     setCurrentPage(1); // Reset to the first page on month change
//   };

//   return (
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
//           <option value="">Select Month</option>
//           {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
//             <option key={index} value={month.toLowerCase()}>{month}</option>
//           ))}
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
//           {filteredTransactions.slice((currentPage - 1) * perPage, currentPage * perPage).map(transaction => (
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
//         <span>Page {currentPage} of {totalPages}</span>
//         <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-gray-300 p-2 rounded">Next</button>
//       </div>
//     </div>
//   );
// }


// code 4

// import React, { useEffect, useState } from "react";

// export default function Home() {
//   const [transactions, setTransactions] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [perPage, setPerPage] = useState(10);
//   const [totalCount, setTotalCount] = useState(0);
//   const [search, setSearch] = useState("");
//   const [month, setMonth] = useState("");
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
//   }, [currentPage, month]); // Fetch data when currentPage or month changes

//   useEffect(() => {
//     // Reset to the first page when search changes
//     setCurrentPage(1);
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

//   // Filter transactions based on search input and selected month
//   const filteredTransactions = transactions.filter(transaction => {
//     const matchesSearch = 
//       transaction.title.toLowerCase().includes(search.toLowerCase()) ||
//       transaction.description.toLowerCase().includes(search.toLowerCase()) ||
//       transaction.price.toString().includes(search); // Ensure price is compared as a string

//     return month ? matchesSearch : true; // If a month is selected, apply search filter; otherwise, return all
//   });

//   // Calculate the starting index for pagination
//   const startIndex = (currentPage - 1) * perPage;
//   const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + perPage);

//   return (
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
//           <option value="">Select Month</option>
//           {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
//             <option key={index} value={month.toLowerCase()}>{month}</option>
//           ))}
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
//         <span>Page {currentPage} of {totalPages}</span>
//         <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-gray-300 p-2 rounded">Next</button>
//       </div>
//     </div>
//   );
// }


// code 5

// import React, { useEffect, useState } from "react";

// export default function Home() {
//   const [transactions, setTransactions] = useState([]);
//   const [allTransactions, setAllTransactions] = useState([]); // To store all transactions
//   const [currentPage, setCurrentPage] = useState(1);
//   const [perPage, setPerPage] = useState(10);
//   const [totalCount, setTotalCount] = useState(0);
//   const [search, setSearch] = useState("");
//   const [month, setMonth] = useState("");
//   const [totalPages, setTotalPages] = useState(0);

//   const fetchTransactions = async () => {
//     const response = await fetch(`http://localhost:8000/api/v2/transaction?page=${currentPage}&perPage=${perPage}&month=${month}`);
//     const data = await response.json();
//     if (data.success) {
//       setTransactions(data.data.transactions);
//       setAllTransactions(data.data.transactions); // Store all fetched transactions
//       setTotalCount(data.data.totalCount);
//       setTotalPages(data.data.totalPages);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, [currentPage, month]); // Fetch data when currentPage or month changes

//   useEffect(() => {
//     // Reset to the first page when search changes
//     setCurrentPage(1);
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

//   // Filter transactions based on search input and selected month
//   const filteredTransactions = transactions.filter(transaction => {
//     const matchesSearch = 
//       transaction.title.toLowerCase().includes(search.toLowerCase()) ||
//       transaction.description.toLowerCase().includes(search.toLowerCase()) ||
//       transaction.price.toString().includes(search); // Ensure price is compared as a string

//     return month ? matchesSearch : true; // If a month is selected, apply search filter; otherwise, return all
//   });

//   // Calculate the starting index for pagination
//   const startIndex = (currentPage - 1) * perPage;
  
//   // Paginate the filtered transactions
//   const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + perPage);

//   // Ensure all transactions are shown when no month is selected
//   const totalFilteredPages = month ? Math.ceil(filteredTransactions.length / perPage) : Math.ceil(allTransactions.length / perPage);

//   return (
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
//           <option value="">Select Month</option>
//           {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
//             <option key={index} value={month.toLowerCase()}>{month}</option>
//           ))}
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
//   );
// }


// code 6

import React, { useEffect, useState } from "react";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("october"); // Default selected month
  const [totalPages, setTotalPages] = useState(0);

  // Function to fetch transactions based on month and search
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
    fetchTransactions(); // Fetch transactions when component mounts or when currentPage/month changes
  }, [currentPage, month]);

  useEffect(() => {
    // Reset to the first page when search changes
    setCurrentPage(1);
    fetchTransactions();
  }, [search]); // Trigger this effect when search changes

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
    // Reset to the first page when month changes
    setCurrentPage(1);
  };

  // Filter transactions based on search input
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch =
      transaction.title.toLowerCase().includes(search.toLowerCase()) ||
      transaction.description.toLowerCase().includes(search.toLowerCase()) ||
      transaction.price.toString().includes(search); // Ensure price is compared as a string

    return matchesSearch; // Filter only based on search input
  });

  // Calculate the starting index for pagination
  const startIndex = (currentPage - 1) * perPage;

  // Paginate the filtered transactions
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + perPage);

  // Calculate total pages based on filtered transactions
  const totalFilteredPages = Math.ceil(filteredTransactions.length / perPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction List</h1>

      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Search..." 
          value={search} 
          onChange={handleSearchChange} 
          className="border p-2"
        />
        <select 
          value={month} 
          onChange={handleMonthChange} 
          className="border p-2 ml-2"
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

      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">ID</th>
            <th className="border border-gray-200 p-2">Title</th>
            <th className="border border-gray-200 p-2">Description</th>
            <th className="border border-gray-200 p-2">Price</th>
            <th className="border border-gray-200 p-2">Category</th>
            <th className="border border-gray-200 p-2">Sold</th>
            <th className="border border-gray-200 p-2">Image</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions.map(transaction => (
            <tr key={transaction.id}>
              <td className="border border-gray-200 p-2">{transaction.id}</td>
              <td className="border border-gray-200 p-2">{transaction.title}</td>
              <td className="border border-gray-200 p-2">{transaction.description}</td>
              <td className="border border-gray-200 p-2">{transaction.price}</td>
              <td className="border border-gray-200 p-2">{transaction.category}</td>
              <td className="border border-gray-200 p-2">{transaction.sold ? "Yes" : "No"}</td>
              <td className="border border-gray-200 p-2">
                <img src={transaction.image} alt={transaction.title} className="h-16 w-16 object-cover" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-gray-300 p-2 rounded">Previous</button>
        <span>Page {currentPage} of {totalFilteredPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalFilteredPages} className="bg-gray-300 p-2 rounded">Next</button>
      </div>
    </div>
  );
}





