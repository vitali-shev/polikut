import { Product } from "@/entities/product/model";
import { Helmet } from "react-helmet-async";

export default function ProductSeo({ product }: { product: Product }) {
  return (
    <Helmet>
      <title>{`${product.title} | POLIKUT`}</title>
      <meta name="description" content={product.description} />
    </Helmet>
  );
}
