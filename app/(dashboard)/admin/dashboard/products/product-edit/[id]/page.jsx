"use client"
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const params = useParams();
  const { id } = params;
  console.log(id);

  // /api/admin/products/eidt/${id}

  return <div>edit /{id}</div>;
};

export default page;
