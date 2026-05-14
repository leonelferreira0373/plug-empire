import { getAllProducts } from "@/lib/products";
import { HomeClient } from "./home-client";

export const revalidate = 60;

export default async function Home() {
  const products = await getAllProducts();
  return <HomeClient products={products} />;
}
