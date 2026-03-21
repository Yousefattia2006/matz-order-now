import { useState, useEffect, useCallback } from "react";
import { products as defaultProducts, Product } from "@/data/products";

const STORAGE_KEY = "tazamart-products";

function loadProducts(): Product[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultProducts;
}

function saveProducts(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  window.dispatchEvent(new Event("products-updated"));
}

export function useProducts() {
  const [productList, setProductList] = useState<Product[]>(loadProducts);

  useEffect(() => {
    const handler = () => setProductList(loadProducts());
    window.addEventListener("products-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("products-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const addProduct = useCallback((product: Product) => {
    const updated = [product, ...loadProducts()];
    saveProducts(updated);
    setProductList(updated);
  }, []);

  const updateProduct = useCallback((product: Product) => {
    const updated = loadProducts().map((p) => (p.id === product.id ? product : p));
    saveProducts(updated);
    setProductList(updated);
  }, []);

  const deleteProduct = useCallback((id: string) => {
    const updated = loadProducts().filter((p) => p.id !== id);
    saveProducts(updated);
    setProductList(updated);
  }, []);

  return { products: productList, addProduct, updateProduct, deleteProduct };
}
