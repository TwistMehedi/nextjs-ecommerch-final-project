"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";
import axios from "axios";
import toast from "react-hot-toast";

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
import { product } from "@/lib/zodSchema";
import useFetch from "@/hooks/useFeatch";

const productSchema = product.pick({
  name: true,
  slug: true,
  mrp: true,
  price: true,
  category: true,
  discount: true,
  image: true,
  description: true,
});

const AddProduct = () => {
  const [isLoading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      slug: "",
      mrp: "",
      price: "",
      category: "",
      discount: "",
      image: "",
      description: "",
    },
  });

  const { watch, setValue } = form;
  const name = watch("name");
  const mrp = watch("mrp");
  const price = watch("price");

  useEffect(() => {
    const slug = slugify(name || "", { lower: true, strict: true });
    setValue("slug", slug);
  }, [name, setValue]);

  useEffect(() => {
    const mrpVal = parseFloat(mrp);
    const priceVal = parseFloat(price);
    if (!isNaN(mrpVal) && !isNaN(priceVal) && mrpVal > 0) {
      const discount = ((mrpVal - priceVal) / mrpVal) * 100;
      setValue("discount", discount.toFixed(2));
    } else {
      setValue("discount", "");
    }
  }, [mrp, price, setValue]);

  const { data } = useFetch("/api/admin/category/all-category");
   

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("slug", data.slug);
      formData.append("mrp", data.mrp);
      formData.append("price", data.price);
      formData.append("discount", data.discount);
      formData.append("category", data.category);
      formData.append("description", data.description);

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      const res = await axios.post("/api/admin/products/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success(res.data.message);

      form.reset();
      setImages([]);
      setPreviews([]);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 flex justify-center px-4">
      <div className="w-full max-w-[700px] px-6 py-10 bg-gray-100 rounded-2xl shadow-md mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Slug */}
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly className="bg-gray-100" />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full border px-4 py-2 rounded-md"
                    >
                      <option value="">Select Category</option>
                      {data?.data?.map((cat) => (
                        <option key={cat._id} value={cat.title}>
                          {cat.title}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* MRP */}
            <FormField
              control={form.control}
              name="mrp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MRP</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Enter MRP" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Enter Price" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Discount */}
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount (%)</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly className="bg-gray-100" />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Description */}
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

            {/* Image Upload */}
            <FormItem>
              <FormLabel>Product Images</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  name="images"
                  onChange={handleImage}
                />
              </FormControl>
              {previews.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {previews.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-32 object-cover rounded-md border"
                    />
                  ))}
                </div>
              )}
            </FormItem>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating..." : "Add Product"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
