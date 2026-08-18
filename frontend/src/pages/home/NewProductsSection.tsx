import { useGetProductCardsQuery } from "@/entities/product/api";
import { routes } from "@/app/router/routes";
import { PRODUCT_PARAMS } from "@/entities/product/model/constants/params";
import { PRODUCT_SORT_OPTIONS } from "@/entities/product/model/constants/sortOptions";
import { ProductQueryParams } from "@/entities/product/model";
import ProductSection from "./ProductSection";

const getDateMonthsAgo = (months: number) => {
  const date = new Date();
  date.setMonth(date.getMonth() - months);

  return date.toISOString().split("T")[0];
};

export default function NewProductsSection() {
  const params: ProductQueryParams = {
    [PRODUCT_PARAMS.page]: 0,
    [PRODUCT_PARAMS.size]: 6,
    [PRODUCT_PARAMS.createdAfter]: getDateMonthsAgo(2),
    [PRODUCT_PARAMS.sort]: PRODUCT_SORT_OPTIONS.NEWEST,
  };

  const { data } = useGetProductCardsQuery(params);

  if (!data?.content?.length) {
    return null;
  }

  return (
    <ProductSection
      title="Новинки"
      button={{
        label: "Більше новинок",
        to: routes.PRODUCTS.newest(),
      }}
      products={data.content}
    />
  );
}
