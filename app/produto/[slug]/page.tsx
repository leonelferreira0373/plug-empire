import { notFound } from "next/navigation";
import { PRODUCTS, getProduct, getRelated } from "@/lib/products";
import { ProductDetail } from "./product-detail";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = getRelated(product.related);
  return <ProductDetail product={product} related={related} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Plug Empire" };
  return {
    title: product.name.pt,
    description: product.description.pt,
    openGraph: {
      title: product.name.pt,
      description: product.description.pt,
      images: [product.images[0]],
    },
  };
}
