"use client";

import { useState } from "react";
import useFetch from "@/hooks/useFeatch";
import Link from "next/link";

const AllProducts = () => {
  const [priceRange, setPriceRange] = useState(2500);
  const [search, setSearch] = useState("");

   const queryParams = [];

  if (search) {
    queryParams.push(`name=${encodeURIComponent(search)}`);
  }

  if (priceRange) {
    queryParams.push(`price=0-${priceRange}`);
  }

  const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

  const { data, loading, error } = useFetch(
    `/api/admin/products/all${queryString}`
  );

  const resetAll = () => {
    setSearch("");
    setPriceRange(2500);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="flex flex-col w-full sm:w-64">
          <label className="text-sm font-medium mb-1">Search</label>
          <input
            type="text"
            value={search}
            onChange={(e) => 
              setSearch(e.target.value)
            }
            className="input input-bordered w-full"
            placeholder="Search by name"
          />
        </div>

        <div className="flex flex-col w-full sm:w-64">
          <label className="text-sm font-medium mb-1">
            Max Price: ${priceRange}
          </label>
          <input
            type="range"
            min="0"
            max="2500"
            value={priceRange}
            onChange={(e) =>
              setPriceRange(Number(e.target.value))}
            className="range w-full"
          />
        </div>
        <button
          onClick={resetAll}
          className="btn btn-outline self-end sm:self-auto"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {!loading && !error && data?.length === 0 && <p>No products found.</p>}
        {!loading &&
          !error &&
          data?.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold mb-2">{product?.name}</h3>
              <p className="text-gray-600">Price: ${product?.price}</p>
              <Link href={`/admin/dashboard/products/product/${product._id}`}>Details</Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
