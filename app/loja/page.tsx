import { getAllProducts } from "@/lib/products";
import { LojaClient } from "./loja-client";

export const revalidate = 60;

export default async function LojaPage() {
  const products = await getAllProducts();
  return <LojaClient products={products} />;
}
