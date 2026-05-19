import { notFound } from "next/navigation";
import { getProductBySlug, getProductSlugs, getRelated } from "@/lib/products";
import { ProductDetail } from "./product-detail";

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = true;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const related = await getRelated(product.related);
  return <ProductDetail product={product} related={related} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Stravages" };
  return {
    title: product.name.pt,
    description: product.description.pt,
    openGraph: {
      title: product.name.pt,
      description: product.description.pt,
      images: product.images[0] ? [product.images[0]] : [],
    },
  };
}
