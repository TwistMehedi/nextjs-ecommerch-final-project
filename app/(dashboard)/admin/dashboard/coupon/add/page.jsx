"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { couponCodeValidation } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Page = () => {

  const fullCouponSchema = couponCodeValidation.pick({
    code: true,
    discountPercentage: true,
    minShoppingPrice: true,
    validity: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(fullCouponSchema),
    defaultValues: {
      code: "",
      discountPercentage: 0,
      minShoppingPrice: 0,
      validity: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
       const payload = {
        code: data.code,
        discountPercentage: Number(data.discountPercentage),
        minShoppingPrice: Number(data.minShoppingPrice),
        validity: new Date(data.validity),
      };

      const res = await axios.post("/api/admin/coupon/add", payload);
      toast.success(res.data.message);
      form.reset();

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coupon Code</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter coupon code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

       
          <FormField
            control={form.control}
            name="discountPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount Percentage</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter discount %"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
 
          <FormField
            control={form.control}
            name="minShoppingPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Shopping Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter minimum price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
 
          <FormField
            control={form.control}
            name="validity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Validity Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating coupon..." : "Create Coupon"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
