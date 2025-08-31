"use client";

import useFetch from "@/hooks/useFeatch";
import Image from "next/image";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { EllipsisVertical } from "lucide-react";

const Customers = () => {
  const { data } = useFetch("/api/admin/customers");
  const customers = data?.uniqueUsers ?? [];

  const handleDelete = (id) => {
    alert(`Delete customer with id: ${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">All Customers</h1>

      {/* 🖥️ Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Full Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Verified</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No customers found
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer._id} className="border-t">
                  <td className="px-4 py-2">
                    {customer.image?.secure_url ? (
                      <Image
                        src={customer.image.secure_url}
                        alt={customer.fullName}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full" />
                    )}
                  </td>
                  <td className="px-4 py-2">{customer.fullName}</td>
                  <td className="px-4 py-2">{customer.email}</td>
                  <td className="px-4 py-2">{customer.phone}</td>
                  <td className="px-4 py-2">
                    {customer.isVerified ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-600 font-semibold">No</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <button className="p-2 rounded hover:bg-gray-100">
                          <EllipsisVertical />
                        </button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.Content
                          className="bg-white rounded-md shadow-md border border-gray-200 w-32"
                          sideOffset={5}
                        >
                          <DropdownMenu.Item
                            className="px-4 py-2 cursor-pointer text-red-600 hover:bg-red-600 hover:text-white"
                            onSelect={() => handleDelete(customer._id)}
                          >
                            Delete
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 📱 Mobile Card View */}
      <div className="grid gap-4 md:hidden">
        {customers.length === 0 ? (
          <p className="text-center text-gray-500">No customers found</p>
        ) : (
          customers.map((customer) => (
            <div
              key={customer._id}
              className="border rounded-xl p-4 shadow-sm bg-white flex flex-col gap-2"
            >
              {/* Profile */}
              <div className="flex items-center gap-3">
                {customer.image?.secure_url ? (
                  <Image
                    src={customer.image.secure_url}
                    alt={customer.fullName}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-full" />
                )}
                <div>
                  <p className="font-semibold">{customer.fullName}</p>
                  <p className="text-sm text-gray-500">{customer.email}</p>
                </div>
              </div>

              {/* Details */}
              <div className="text-sm text-gray-700">
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {customer.phone || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Verified:</span>{" "}
                  {customer.isVerified ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-600 font-semibold">No</span>
                  )}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-2 flex justify-end">
                <button
                  onClick={() => handleDelete(customer._id)}
                  className="px-3 py-1 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Customers;
