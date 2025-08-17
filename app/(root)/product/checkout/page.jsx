"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { orderValidator } from "@/lib/zodSchema";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import getStripe from "@/lib/stripe";
import CartItem from "@/app/components/Dashboard/User/CartItem";

const Checkout = () => {
  const searchParams = useSearchParams();
  const product = JSON.parse(decodeURIComponent(searchParams.get("product")));
  const cartProducts = JSON.parse(decodeURIComponent(searchParams.get("products"))); // ata arry akahen ache ami atao backende pathe cai
  const quantity = parseInt(searchParams.get("quantity"));
  const cartsTotalPrice = parseInt(searchParams.get("totalPrice"));
  

  const totalPrice = product && product.price * quantity;
  
  const deliverySchema = orderValidator.pick({ deliveryInfo: true });

  const form = useForm({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
      deliveryInfo: {
        fullName: "",
        phone: "",
        district: "",
        thana: "",
        address: "",
      },
    },
  });

   const onProceedToPay = async (data) => {
  try {
    let productsPayload = [];

    if (cartProducts && cartProducts.length > 0) {
      
      productsPayload = cartProducts.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        discount: item.discount || 0,
        total: item.price * item.quantity,
      }));
    } else if (product) {
    
      productsPayload = [
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity,
          discount: product.discount,
          total: product.price * quantity,
        },
      ];
    }

    const res = await axios.post("/api/users/cart/checkout", {
      products: productsPayload,
      deliveryInfo: data.deliveryInfo,
      itemsTotal: cartsTotalPrice || totalPrice,
      subtotal: cartsTotalPrice || totalPrice,
      deliveryFee: 0,
    });

    console.log(res);

    const sessionId = res?.data?.id;

    if (!sessionId) throw new Error("You already purchased these product(s)");

    if (res.status === 200) {
      const stripe = await getStripe();

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) console.error(error.message);
    } else {
      toast.error("Failed to purchase items");
    }
  } catch (err) {
    console.error("Checkout failed:", err);
  }
};


  return (
    <div className="container mx-auto p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onProceedToPay)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left Side: Delivery Info */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {["fullName", "phone", "district", "thana", "address"].map(
                (field) => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={`deliveryInfo.${field}`}
                    render={({ field: f }) => (
                      <FormItem>
                        <FormLabel>
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder={`Enter your ${field}`} {...f} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              )}
            </CardContent>
          </Card>

          {/* Right Side: Order Summary */}
          <Card className="w-full">
            
               <CartItem cartsProducts={cartProducts} carstPrice={cartsTotalPrice} quantity={quantity} totalPrice={totalPrice} buttonText={"Proceed to Pay"}/>
            
          </Card>
          
        </form>
      </Form>
    </div>
  );
};

export default Checkout;
