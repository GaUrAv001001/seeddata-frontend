import React, { useEffect, useState } from "react";
import Statistics from "../Statistics/Statistics";
import PieChartStats from "../PieChartStats/PieChartStats";
import BarChartStats from "../BarChartStats/BarChartStats";
const API_URL = import.meta.env.VITE_API_URL;

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("october");
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state

  const fetchTransactions = async () => {
    setLoading(true);
    const response = await fetch(
      `${API_URL}?page=${currentPage}&perPage=${perPage}&month=${month}`
    );
    const data = await response.json();
    if (data.success) {
      setTransactions(data.data.transactions);
      setTotalCount(data.data.totalCount);
      setTotalPages(data.data.totalPages);
    }
    setLoading(false);
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

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.title.toLowerCase().includes(search.toLowerCase()) ||
      transaction.description.toLowerCase().includes(search.toLowerCase()) ||
      transaction.price.toString().includes(search);

    return matchesSearch;
  });

  const startIndex = (currentPage - 1) * perPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + perPage
  );
  const totalFilteredPages = Math.ceil(filteredTransactions.length / perPage);

  return (
    <>
      <h1 className="text-3xl font-bold justify-center flex mt-6 mb-4 text-[#2733b8]">
        Transaction List
      </h1>

      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        {/* Search and Month Filter */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center">
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
            className="ml-0 mt-2 sm:mt-0 border border-gray-300 p-2 rounded-md sm:ml-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 bg-gray-100 rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left">ID</th>
                    <th className="border border-gray-300 p-3 text-left">
                      Title
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      Description
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      Price
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      Category
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      Sold
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      Image
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="hover:bg-gray-200 transition duration-200"
                    >
                      <td className="border border-gray-300 p-2">
                        {transaction.id}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {transaction.title}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {transaction.description}
                      </td>
                      <td className="border border-gray-300 p-2">
                        ₹{transaction.price}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {transaction.category}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {transaction.sold ? "Yes" : "No"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        <img
                          src={transaction.image}
                          alt={transaction.title}
                          className="h-16 w-16 object-cover rounded"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="bg-gray-300 p-2 rounded-md hover:bg-gray-400 transition duration-200"
              >
                Previous
              </button>
              <span className="self-center">
                Page {currentPage} of {totalFilteredPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalFilteredPages}
                className="bg-gray-300 p-2 rounded-md hover:bg-gray-400 transition duration-200"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* Performance Dashboard */}
      <h1 className="flex justify-center mt-20 font-bold text-3xl text-[#2733b8]">
        Performance Dashboard
      </h1>
      <div className="flex flex-col lg:flex-row justify-center mt-6 space-x-4 p-6">
        <div className="lg:w-1/2">
          <PieChartStats />
        </div>
        <div className="lg:w-1/2">
          <div className="mt-5 lg:mt-0">
            <BarChartStats />
          </div>
          <div className="mt-10 lg:mt-4">
            <Statistics />
          </div>
        </div>
      </div>
    </>
  );
}
