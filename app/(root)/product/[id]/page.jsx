"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Star } from "lucide-react";
import useFetch from "@/hooks/useFeatch";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const { data } = useFetch(`/api/users/product/${id}`);
  // console.log(data);

  const product = data?.product;
  // console.log(product);

  const [selectedImage, setSelectedImage] = useState("");
  // console.log(selectedImage);

  const [quantity, setQuantity] = useState(1);

  return (
    <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Section - Images */}
      <div className="flex flex-col gap-4">
        <Card className="flex items-center justify-center p-4">
          <Image
            src={selectedImage ? selectedImage : product?.images[0]?.secure_url}
            alt={product?.name}
            width={400}
            height={400}
            className="rounded-lg object-cover"
          />
        </Card>
        <div className="flex gap-2 justify-center">
          {product?.images?.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(image?.secure_url)}
              className={`border rounded-lg p-1 ${
                selectedImage === image?.secure_url
                  ? "border-blue-600"
                  : "border-gray-300"
              }`}
            >
              <Image
                src={image?.secure_url || "/placeholder.png"}
                alt={`${image?.public_id || "Product"} thumbnail ${idx + 1}`}
                width={70}
                height={70}
                className="rounded-md object-cover cursor-pointer"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Right Section - Product Info */}
      <div>
        <h1 className="text-2xl font-bold">{product?.name}</h1>
        <p className="text-gray-600">{product?.description}</p>

        <Separator className="my-4" />

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-blue-600">
            $ {product?.price}
          </span>

          <span className="text-green-600 font-semibold">
            -{product?.discount}%
          </span>
        </div>

        {/* Quantity */}
        <div className="flex items-center mt-4 gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="text-lg font-semibold">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <Button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() =>
              router.push(
                `/product/checkout?product=${encodeURIComponent(
                  JSON.stringify(product)
                )}&quantity=${quantity}`
              )
            }
          >
            Buy Now
          </Button>

          <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
