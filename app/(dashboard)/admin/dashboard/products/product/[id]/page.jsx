"use client";

import { useParams } from "next/navigation";

import useFetch from "@/hooks/useFeatch";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Link from "next/link";

const Page = () => {

  const params = useParams();
  
  const { id } = params;
  const { data, loading, error } = useFetch(`/api/admin/products/get/${id}`);
  const product = data?.product;

  return (

    <div className="max-w-md mx-auto py-4 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Product ID: {id}</h1>
        {product?._id && (
          <Link
            href={`/admin/dashboard/products/product-edit/${product._id}`}
            className="text-blue-500 hover:underline"
          >
            Edit Product
          </Link>
        )}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {product && (
        <>
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Slug:</strong> {product.slug}</p>
          <p><strong>Price:</strong> Tk: {product.price}</p>

          {product.images?.length > 0 && (
            <Carousel className="w-full max-w-md mt-4">
              <CarouselContent>
                {product.images.map((image, idx) => (
                  <CarouselItem key={idx}>
                    <div className="p-1">
                      <Image
                        src={image.secure_url}
                        alt={`Product Image ${idx + 1}`}
                        width={600}
                        height={400}
                        className="rounded-lg object-cover w-full h-[300px]"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
