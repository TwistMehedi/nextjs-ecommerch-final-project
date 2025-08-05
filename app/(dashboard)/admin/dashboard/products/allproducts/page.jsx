"use client";

import useFetch from '@/hooks/useFeatch';
 

const AllProducts = () => {

  const {data, loading, error} = useFetch("/api/admin/products/all");
  console.log(data);
  
  return (
    <div>
      AllProducts
    </div>
  )
};

export default AllProducts;
