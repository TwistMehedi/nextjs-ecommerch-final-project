"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editEschema } from "@/lib/zodSchema";
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
import axios from "axios";
import useFetch from "@/hooks/useFeatch";

const Page = () => {
  const { id } = useParams();

  const editSchema = editEschema.pick({
    name: true,
    mrp: true,
    price: true,
    // description: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(editSchema),
    defaultValues: {
      name: "",
      mrp: "",
      price: "",
      description: ""
    },
  });

  const { data } = useFetch(`/api/admin/products/get/${id}`);
  const product = data?.product;
  // console.log(product);

  useEffect(() => {
    if (product) {
      form.reset({
        name: product?.name || "",
        mrp: product.mrp?.toString() || "",
        price: product.price?.toString() || "",
        description: product?.descrption || "",
      });
    }
  }, [product, form]);

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);
      const res = await axios.put(`/api/admin/products/edit/${id}`, formData, {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) {
    return <p className="text-center mt-10">Loading product...</p>;
  }

  return (
    <div className="max-w-xl mx-auto py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mrp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MRP</FormLabel>
                <FormControl>
                  <Input placeholder="Enter MRP" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Price" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    rows={4}
                    className="w-full border p-2 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
