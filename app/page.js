"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFeatch";

import {
  // import { product } from '@/lib/zodSchema';
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import toast from "react-hot-toast";
import axios from "axios";

export default function ProductPage() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [page, setPage] = useState(1);

  let query = [];

  if (search.trim() !== "") {
    query.push(`name=${encodeURIComponent(search)}`);
  }

  if (priceRange && priceRange !== "all") {
    if (priceRange === "under100") {
      query.push(`priceMax=100`);
    } else if (priceRange === "100to200") {
      query.push(`priceMin=100`);
      query.push(`priceMax=200`);
    } else if (priceRange === "200to500") {
      query.push(`priceMin=200`);
      query.push(`priceMax=500`);
    } else if (priceRange === "above1000") {
      query.push(`priceMin=1000`);
    }
  }

  if (category && category !== "all") {
    query.push(`category=${encodeURIComponent(category)}`);
  }

  query.push(`page=${page}`);

  const queryString = query.length > 0 ? `?${query.join("&")}` : "";

  const { data } = useFetch(`/api/users/products${queryString}`);
  const products = data?.products || [];
  console.log(products)
  const totalPages = data?.totalPages || 1;

  const { data: categoryData } = useFetch(`/api/admin/category/get`);
  const categories = categoryData?.categories || [];

  const clearFilter = () => {
    setCategory("all");
    setPriceRange("all");
    setSearch("");
    setPage(1);
  };

  const addProductToCart = async (product) => {
    const { _id, name, price, images } = product;
    try {
      const res = await axios.post("/api/users/cart/create", {_id,name,price,images});
      toast.success(res.data?.message);
    } catch (error) {
       console.log(error);
      toast.error(
        error?.response?.data?.message || "Add product to cart client problem"
      );
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <section className="mb-12 text-center md:text-left md:flex md:items-center md:justify-between">
        <div className="max-w-xl mx-auto md:mx-0">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            Discover Premium <span className="text-indigo-600">Products</span>
          </h1>
          <p className="text-gray-600 mb-6">
            Explore our exclusive collection with high quality and affordable
            prices.
          </p>
          <Button size="lg">Shop Now</Button>
        </div>
        <div className="hidden md:block w-1/2"></div>
      </section>

      <section className="mb-8 flex flex-wrap gap-4 items-center justify-center md:justify-start">
        <Select
          onValueChange={(value) => {
            setCategory(value);
            setPage(1);
          }}
          value={category}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => {
            setPriceRange(value);
            setPage(1);
          }}
          value={priceRange}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Prices" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="under100">Under $100</SelectItem>
            <SelectItem value="100to200">$100 to $200</SelectItem>
            <SelectItem value="200to500">$200 to $500</SelectItem>
            <SelectItem value="above1000">Above $1000</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-60"
        />

        <Button variant="outline" onClick={clearFilter}>
          Clear Filters
        </Button>
      </section>

      <section>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {products.length > 0 ? (
            products.map((product) => (
              
              <div
                key={product._id}
                className="border rounded-lg shadow-md overflow-hidden flex flex-col"
              >
                <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={product?.images?.[0]?.secure_url}
                    alt={product?.name}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600 flex-grow">{product.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-indigo-600">
                      ${product.price}
                    </span>
                    <Button
                      onClick={()=>addProductToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </section>

      <section className="mt-10 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) setPage(page - 1);
                }}
              />
            </PaginationItem>

            {[...Array(totalPages).keys()].map((num) => {
              const pageNum = num + 1;
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href="#"
                    isActive={pageNum === page}
                    className={`${
                      pageNum === page
                        ? "bg-indigo-600 text-white filter blur-sm opacity-90"
                        : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(pageNum);
                    }}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page < totalPages) setPage(page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </main>
  );
}
