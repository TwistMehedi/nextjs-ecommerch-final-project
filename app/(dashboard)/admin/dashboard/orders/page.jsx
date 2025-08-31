"use client";

import useFetch from "@/hooks/useFeatch";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Orders = () => {
  const { data } = useFetch("/api/admin/orders");
  const orders = data?.orders || [];

  if (!data) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Orders</h2>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Products</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Subtotal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>
                  <div className="flex flex-col gap-2">
                    {order.products.map((p, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <img
                          src={p?.images?.[0]?.secure_url}
                          alt={p?.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium">{p?.name}</p>
                          <p className="text-xs text-gray-500">
                            Qty: {p?.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="text-sm">
                    <p className="font-medium">{order.deliveryInfo?.fullName}</p>
                    <p>{order.deliveryInfo?.phone}</p>
                    <p>
                      {order.deliveryInfo?.district}, {order.deliveryInfo?.thana}
                    </p>
                    <p>{order.deliveryInfo?.address}</p>
                  </div>
                </TableCell>

                <TableCell>
                  <p>${order.subtotal}</p>
                  <p className="text-xs text-gray-500">
                    Delivery: ${order.deliveryFee}
                  </p>
                  {order.discountTotal > 0 && (
                    <p className="text-xs text-green-600">
                      Discount: -${order.discountTotal}
                    </p>
                  )}
                </TableCell>

                <TableCell>
                  <Badge
                    variant={
                      order.paymentStatus === "On The Way"
                        ? "secondary"
                        : "default"
                    }
                  >
                    {order.paymentStatus}
                  </Badge>
                </TableCell>

                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View */}
      <div className="grid gap-4 md:hidden">
        {orders.map((order) => (
          <Card key={order._id}>
            <CardContent className="p-3 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Order #{order._id.slice(-6)}</h3>
                <Badge>{order.paymentStatus}</Badge>
              </div>

              {/* Products */}
              <div className="flex flex-col gap-2">
                {order.products.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <img
                      src={p?.images?.[0]?.secure_url}
                      alt={p?.name}
                      className="w-14 h-14 rounded object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">{p?.name}</p>
                      <p className="text-xs text-gray-600">
                        Qty: {p?.quantity}
                      </p>
                      <p className="text-xs text-gray-600">
                        Subtotal: ${p?.subtotal}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Address */}
              <div className="border-t pt-2 text-sm">
                <p>
                  <span className="font-medium">Name: </span>
                  {order.deliveryInfo?.fullName}
                </p>
                <p>
                  <span className="font-medium">Phone: </span>
                  {order.deliveryInfo?.phone}
                </p>
                <p>
                  <span className="font-medium">Address: </span>
                  {order.deliveryInfo?.address}, {order.deliveryInfo?.thana},{" "}
                  {order.deliveryInfo?.district}
                </p>
              </div>

              {/* Totals */}
              <div className="border-t pt-2 text-sm">
                <p>
                  <span className="font-medium">Subtotal: </span>$
                  {order.subtotal}
                </p>
                <p>
                  <span className="font-medium">Delivery Fee: </span>$
                  {order.deliveryFee}
                </p>
                {order.discountTotal > 0 && (
                  <p className="text-green-600">
                    Discount: -${order.discountTotal}
                  </p>
                )}
              </div>

              <p className="text-xs text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orders;
