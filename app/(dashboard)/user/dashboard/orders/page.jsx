"use client";

import React from "react";
import useFetch from "@/hooks/useFeatch";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Image from "next/image";

const Orders = () => {
  const { data } = useFetch("/api/users/orders");
  const orders = data?.orders || [];

  if (!data) return <p>Loading orders...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead>Payment Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) =>
                order?.products.map((item) => (
                     
                  <TableRow key={item._id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      {/* <Image
                        src={item?.product?.images[0]?.secure_url}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      /> */}
                      {console.log(item)}

                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>${item.total}</TableCell>
                    <TableCell>{order.paymentStatus}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Orders;
