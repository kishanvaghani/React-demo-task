import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "./utils";
import ReactPaginate from "react-paginate";
import ProductCard from "./components/productCard";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(10);

  const {
    data: productsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products", page, resultsPerPage, query],
    queryFn: () => getData(page, resultsPerPage, query),
    enabled: true,
  });

  async function getData(pageNumber, limit, searchQuery) {
    const skip = pageNumber * limit;
    const url = searchQuery
      ? `search?q=${searchQuery}&limit=${limit}&skip=${skip}`
      : `?limit=${limit}&skip=${skip}`;

    const res = await getRequest(url);
    return res;
  }

  const searchProducts = (e) => {
    e.preventDefault();
    refetch();
  };

  const totalProducts = productsData?.total || 0;
  const pageCount = Math.ceil(totalProducts / resultsPerPage);

  return (
    <div className="bg-gray-100 min-h-screen p-6 relative">
      {isLoading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="loader border-t-transparent border-blue-500 border-4 border-solid rounded-full w-16 h-16 animate-spin"></div>
        </div>
      )}

      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Product Search</h1>

        <form onSubmit={searchProducts} className="mb-6 flex justify-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-1/2 p-2 border rounded-md"
          />
        </form>

        <div className="mb-6 text-center">
          <label className="mr-2">Results per page:</label>
          <select
            value={resultsPerPage}
            onChange={(e) => setResultsPerPage(Number(e.target.value))}
            className="p-2 border rounded-md"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        {isError && (
          <p className="text-center text-red-500">Error fetching products.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsData?.products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <ReactPaginate
          className="flex justify-center mt-6 space-x-2"
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={(selected) => setPage(selected.selected)}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Previous"
          renderOnZeroPageCount={null}
          activeClassName="bg-blue-500 text-white rounded-md"
          containerClassName="flex"
          pageClassName="px-3 py-1 border rounded-md"
          previousClassName="px-3 py-1 border rounded-md hover:bg-blue-500  hover:text-white"
          nextClassName="px-3 py-1 border rounded-md hover:bg-blue-500  hover:text-white"
          breakClassName="px-3 py-1 border hover:bg-blue-500  hover:text-white"
          disabledClassName="bg-gray-400 text-gray-500"
        />
      </div>
    </div>
  );
}

export default App;
