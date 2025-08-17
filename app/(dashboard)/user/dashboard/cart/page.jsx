"use client";

import useFetch from "@/hooks/useFeatch";
import React, { useState, useEffect } from "react";
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
import { loadStripe } from "@stripe/stripe-js";
import getStripe from "@/lib/stripe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CartItem from "@/app/components/Dashboard/User/CartItem";
// import { Button } from "@/components/ui/button";

const Cart = () => {
  const [couponInput, setCouponInput] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [disscountPercentage, setDisscountPercentage] = useState("");

  const { data, error } = useFetch("/api/users/cart/get");
  const carts = data?.cartsItems || [];
  // console.log(carts._id)
  const itemsFromApi = carts[0]?.items || [];

  const { data: couponsData } = useFetch("/api/admin/coupon/all");
  const coupons = couponsData?.data || [];
  // console.log(coupons);

  const [cartItems, setCartItems] = useState([]);
  console.log(cartItems);

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch cart data");
    }
  }, [error]);

  useEffect(() => {
    if (itemsFromApi && itemsFromApi.length !== cartItems.length) {
      setCartItems(itemsFromApi);
    }
  }, [itemsFromApi, cartItems.length]);

  if (!data) {
    return <div className="p-4 text-center">Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return <div className="p-4 text-center">Your cart is empty</div>;
  }

  const cartId = carts[0]?._id;

  const removeItem = async (itemId) => {
    try {
      const res = await axios.delete("/api/users/cart/remove", {
        data: { itemId },
        withCredentials: true,
      });

      if (res.status === 200) {
        toast.success("Item removed from cart");
      } else {
        toast.error("Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("An error occurred while removing the item");
    }
  };

  const clearCart = async () => {
    try {
      const res = await axios.delete("/api/users/cart/clearall", {
        data: { cartId },
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

  const updateQuantity = async (itemId, price, currentQuantity, type) => {
    let newQuantity =
      type === "increase" ? currentQuantity + 1 : currentQuantity - 1;
    if (newQuantity < 1) return;

    // Local state update
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === itemId
          ? { ...item, quantity: newQuantity, total: price * newQuantity }
          : item
      )
    );

    let total = price * newQuantity;

    try {
      const res = await axios.put(
        "/api/users/cart/update",
        { itemId, quantity: newQuantity, price, total },
        { withCredentials: true }
      );

      toast.success(res.data.message || "Cart updated");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Cart update failed");
    }
  };

  // const couponCodes = coupons?.map((coupon) => coupon?.code) || [];
  // console.log(couponCodes);

  const totalPrice = cartItems.reduce((total, cartItem) => {
    return total + (cartItem.total || cartItem.price * cartItem.quantity);
  }, 0);

  console.log(totalPrice);

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
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems.map((item) => (
            <TableRow key={item._id}>
              <TableCell>
                <img
                  src={item?.image?.secure_url}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        item.price,
                        item.quantity,
                        "decrease"
                      )
                    }
                  >
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        item.price,
                        item.quantity,
                        "increase"
                      )
                    }
                  >
                    +
                  </Button>
                </div>
              </TableCell>
              <TableCell>${item.total || item.price * item.quantity}</TableCell>
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
      </Table>
      <div className="flex justify-between">
        <Button
          onClick={clearCart}
          className="bg-red-500 hover:bg-red-600 text-white mt-4"
        >
          Remove All Cart
        </Button>

        <div className="w-full max-w-md mx-auto p-2">
          <CartItem cart={cartItems} totalPrice={totalPrice}
            buttonText={"Checkout"}/>
            
        </div>
        
      </div>
    </div>
  );
};

export default Cart;
