"use client"

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
  const codeSchema = couponCodeValidation.pick({ code: true });
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: "",
    },
  });

 const onSubmit = async (data) => {
  setIsLoading(true);
  try {
    const res = await axios.post("/api/admin/coupon/add", data);
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
                  <Input placeholder="Enter coupon code" {...field} />
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
