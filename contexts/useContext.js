"use client";  

import { createContext, useContext, useEffect, useState } from "react";
  
 
const ProductContext = createContext();
 
export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);  
  console.log("product",product) // kintu akhane pacchi na

   useEffect(() => {
    console.log("Product state updated:", product);
  }, [product]);

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};


export const useProduct = () => useContext(ProductContext);
