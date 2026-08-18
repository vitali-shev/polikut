import { useGetProductCardsQuery } from "@/entities/product/api";
import { routes } from "@/app/router/routes";
import { PRODUCT_PARAMS } from "@/entities/product/model/constants/params";
import { PRODUCT_SORT_OPTIONS } from "@/entities/product/model/constants/sortOptions";
import { ProductQueryParams } from "@/entities/product/model";
import ProductSection from "./ProductSection";

export default function DiscountedProductsSection() {
  const params: ProductQueryParams = {
    [PRODUCT_PARAMS.page]: 0,
    [PRODUCT_PARAMS.size]: 6,
    [PRODUCT_PARAMS.discount]: true,
    [PRODUCT_PARAMS.sort]: PRODUCT_SORT_OPTIONS.DISCOUNT_PERCENT_DESC,
  };

  const { data } = useGetProductCardsQuery(params);

  if (!data?.content?.length) {
    return null;
  }

  return (
    <ProductSection
      title="Товари зі знижкою"
      button={{
        label: "Більше знижок",
        to: routes.PRODUCTS.discount(),
      }}
      products={data.content}
    />
  );
}
