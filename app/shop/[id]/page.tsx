import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProductById, getRelatedProducts } from "../../data/products";
import ProductDetailClient from "./product-detail-client";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found | Radharaman Candles",
    };
  }

  return {
    title: `${product.name} | Radharaman Luxury Candles`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Radharaman Luxury Candles`,
      description: product.description,
      images: [
        {
          url: product.image,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product.id, 3);

  return <ProductDetailClient product={product} relatedProducts={related} />;
}
