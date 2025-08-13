"use client";

import useFetch from "@/hooks/useFeatch";
import React from "react";
import toast from "react-hot-toast";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const { data, error } = useFetch("/api/users/cart/get");
  const carts = data?.cartsItems || [];
  const items = carts[0]?.items || [];


  React.useEffect(() => {
    if (error) {
      toast.error("Failed to fetch cart data");
    }
  }, [error]);

  if (!data) {
    return <div className="p-4 text-center">Loading cart...</div>;
  }

  if (items.length === 0) {
    return <div className="p-4 text-center">Your cart is empty</div>;
  }

  const removeItem = async (itemId) => {
    try {
      const res = await axios.delete("/api/users/cart/remove", {
        data: { itemId },
        withCredentials: true,
      });

      if (res.status === 200) {
        toast.success("Item removed from cart");
        // Optional: refresh cart data
      } else {
        toast.error("Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("An error occurred while removing the item");
    }
  };

   const cartId = carts[0]?._id;

  const clearCart = async () => {
    try {
      const res = await axios.delete("/api/users/cart/clearall", {
        data: {cartId},
        withCredentials: true,
      });

      if (res.status === 200) {
        toast.success("All items removed from cart");
      } else {
        toast.error("Failed to clear cart");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("An error occurred while clearing the cart");
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item._id}>
              {/* {console.log(item)} */}
              <TableCell>
                <img
                  src={item?.image?.secure_url}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>${item.price * item.quantity}</TableCell>
              <TableCell>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <Button
          onClick={clearCart}
          className="bg-red-500 hover:bg-red-600 text-white mt-4"
        >
          Remove All Cart
        </Button>
      </Table>
    </div>
  );
};

export default Cart;
