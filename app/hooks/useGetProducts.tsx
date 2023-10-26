import axios from "axios";
import { useState, useEffect } from "react";

import { Product } from "../../types";

const useGetProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleGetProducts = async () => {
    try {
      const response = await axios("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (error) {
      console.log("erorr", error);
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  return { products };
};

export default useGetProducts;
