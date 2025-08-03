"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, MoreVertical } from "lucide-react";
import axios from "axios";

const AllCategory = () => {
  const [categories, setCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null); // Track which row's dropdown is open

  const dropdownRef = useRef(null);

  const fetchCategories = async (sort = null) => {
    try {
      const url = sort
        ? `/api/admin/category/all-category?sort=${sort}`
        : `/api/admin/category/all-category`;

      const res = await axios.get(url);
      setCategories(res.data.data || []);
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleToggleLengthSort = () => {
    const newOrder =
      sortOrder === "asc"
        ? "desc"
        : sortOrder === "desc"
        ? null
        : "asc";

    setSortOrder(newOrder);
    fetchCategories(newOrder);
  };

  const LengthSortIcon = () => {
    if (sortOrder === "asc")
      return <ArrowUp className="inline-block ml-1 text-gray-600" size={14} />;
    if (sortOrder === "desc")
      return <ArrowDown className="inline-block ml-1 text-gray-600" size={14} />;
    return <ArrowUpDown className="inline-block ml-1 text-gray-400" size={14} />;
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-4 sm:p-6 max-w-full w-full">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-4">
        Home &gt; <span className="font-semibold">Category</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <h2 className="text-lg font-bold uppercase">Categories</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm"
            onClick={() => alert("Export CSV functionality")}
          >
            Export
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded text-sm">
            + New Category
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="p-2 text-left">
                <input type="checkbox" />
              </th>
              <th className="p-2 text-left">Parent</th>
              <th
                className="p-2 text-left cursor-pointer select-none whitespace-nowrap"
                onClick={handleToggleLengthSort}
              >
                Category Name <LengthSortIcon />
              </th>
              <th className="p-2 text-left">Slug</th>
              <th className="p-2 text-center whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item) => (
              <tr
                key={item._id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors relative"
              >
                <td className="p-2">
                  <input type="checkbox" />
                </td>
                <td className="p-2 whitespace-nowrap">{item.parent}</td>
                <td className="p-2 whitespace-nowrap">
                  {item.title}{" "}
                  <span className="text-xs text-gray-400">
                    ({item.title?.length})
                  </span>
                </td>
                <td className="p-2 whitespace-nowrap">{item.slug}</td>
                <td className="p-2 text-center relative" ref={dropdownRef}>
                  <button
                    className="p-1 hover:bg-gray-200 rounded"
                    onClick={() =>
                      setOpenDropdownId(openDropdownId === item._id ? null : item._id)
                    }
                  >
                    <MoreVertical size={18} />
                  </button>

                  {/* Dropdown menu */}
                  {openDropdownId === item._id && (
                    <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-300 rounded shadow-md z-10">
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => alert(`Edit ${item.title}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                        onClick={() => alert(`Delete ${item.title}`)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCategory;
