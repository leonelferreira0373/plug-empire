import { getAllProducts } from "@/lib/products";
import { getHome } from "@/lib/site-content";
import { HomeClient } from "./home-client";

export const revalidate = 60;

export default async function Home() {
  const [products, home] = await Promise.all([getAllProducts(), getHome()]);
  return <HomeClient products={products} home={home} />;
}
