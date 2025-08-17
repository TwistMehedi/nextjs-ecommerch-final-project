import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import React from "react";

const CartItem = ({cart=[],cartsProducts=[],totalPrice, buttonText, quantity, carstPrice}) => {

  console.log(carstPrice);

   const router = useRouter();

   const itemsCount = quantity || cartsProducts.length || cart.length;

  const handleCheckout = () => {
    router.push(
      `/product/checkout?products=${encodeURIComponent(
        JSON.stringify(cart)
      )}&totalPrice=${totalPrice}`
    );
  };

  return (
    <div className="w-full max-w-md mx-auto p-2">
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Subtotal */}
          <div className="flex justify-between text-sm">
            <span>Total ({itemsCount} items)</span>
            <span>${totalPrice ? totalPrice: carstPrice}</span>
          </div>

          {/* Shipping Fee */}
          <div className="flex justify-between text-sm">
            <span>Shipping Fee</span>
            <span>Fee</span>
          </div>

          <hr className="my-2" />

          {/* Total */}
          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span className="text-orange-600">${totalPrice ? totalPrice: carstPrice}</span>
          </div>

          {/* Checkout Button */}
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold"
            onClick={buttonText === "Proceed to Pay" ? undefined : handleCheckout}
            type={buttonText === "Proceed to Pay" ? "submit" : "button"}
          >
            {buttonText} {itemsCount}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartItem;
