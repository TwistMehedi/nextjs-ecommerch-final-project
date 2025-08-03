"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { category } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";
import axios from "axios";
import toast from "react-hot-toast";

const AddCategory = () => {

  const [isLoading, setLoading] = useState(false);
  const categorySchema = category.pick({ title: true, slug: true });

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: "",
      slug: "",
    },
     
  });

  const { watch, setValue } = form;
  const title = watch("title");

  useEffect(() => {
    const slug = slugify(title || "", { lower: true, strict: true });
    setValue("slug", slug);
  }, [title, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/admin/category/add-category", data);
      toast.success(res.data.message);
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 flex justify-center px-4">
      <div className="w-full max-w-[700px] px-6 py-10 bg-gray-100 rounded-2xl shadow-md mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Category name is required"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your slug"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full py-2" disabled={isLoading}>
              {isLoading ? "Creating Category..." : "Add Category"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddCategory;
