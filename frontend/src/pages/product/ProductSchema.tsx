import { Product } from "@/entities/product/model";
import { Helmet } from "react-helmet-async";

export default function ProductSchema({ product }: { product: Product }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.map((image) => image.url),
    sku: product.sku,

    brand: {
      "@type": "Brand",
      name: "Polikut",
    },

    offers: {
      "@type": "Offer",
      //   url: TODO
      price: String(product.currentPrice),
      priceCurrency: "UAH",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
