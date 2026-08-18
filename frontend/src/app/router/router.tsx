import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import { lazy } from "react";
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const CategoriesManagementPage = lazy(
  () => import("@/pages/admin/categories-management"),
);
const ProductCreatePage = lazy(() => import("@/pages/admin/product-create"));
const ProductEditPage = lazy(() => import("@/pages/admin/product-edit"));
const ProductDeletePage = lazy(() => import("@/pages/admin/product-delete"));
const OrdersPage = lazy(() => import("@/pages/admin/orders/OrdersPage"));
const OrderDetailsPage = lazy(
  () => import("@/pages/admin/orders/OrderDetailsPage"),
);
const DashboardPage = lazy(() => import("@/pages/admin/dashboard"));
import MainLayout from "../layouts/MainLayout";
import HomePage from "@/pages/home";
import CatalogPage from "@/pages/catalog";
import ProductPage from "@/pages/product";
import ProtectedRoute from "./ProtectedRoute";
import { CheckoutPage, CheckoutSuccessPage } from "@/pages/checkout";
import CheckoutLayout from "../layouts/CheckoutLayout";
import { DeliveryPage, PaymentPage, ReturnPolicyPage } from "@/pages/info";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: routes.HOME,
        element: <HomePage />,
      },
      {
        path: routes.RETURN_POLICY,
        element: <ReturnPolicyPage />,
      },
      {
        path: routes.PAYMENT,
        element: <PaymentPage />,
      },
      {
        path: routes.DELIVERY,
        element: <DeliveryPage />,
      },
      {
        path: routes.PRODUCTS.path, // --> PRODUCTS
        children: [
          {
            index: true,
            element: <CatalogPage />,
          },
          {
            path: routes.PRODUCTS.DETAILS.segment,
            element: <ProductPage />,
          },
        ],
      },
    ],
  },
  {
    path: routes.CHECKOUT.path,
    element: <CheckoutLayout />,
    children: [
      {
        index: true,
        element: <CheckoutPage />,
      },
      {
        path: routes.CHECKOUT.SUCCESS.segment,
        element: <CheckoutSuccessPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: routes.ADMIN.ROOT, // --> ADMIN
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: routes.ADMIN.CATEGORIES.path,
            element: <CategoriesManagementPage />,
          },
          {
            path: routes.ADMIN.PRODUCTS.segment, // --> PRODUCTS
            children: [
              {
                path: routes.ADMIN.PRODUCTS.CREATE.segment,
                element: <ProductCreatePage />,
              },
              {
                path: routes.ADMIN.PRODUCTS.EDIT.segment,
                element: <ProductEditPage />,
              },
              {
                path: routes.ADMIN.PRODUCTS.DELETE.segment,
                element: <ProductDeletePage />,
              },
            ],
          },
          {
            path: routes.ADMIN.ORDERS.segment, // --> ORDERS
            children: [
              {
                index: true,
                element: <OrdersPage />,
              },
              {
                path: routes.ADMIN.ORDERS.DETAILS.segment,
                element: <OrderDetailsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
