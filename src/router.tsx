import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  Link,
  redirect,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import { ProductsSelector } from "./features/products/selector";
import AdminPage from "./pages/AdminPage";
import BasketPage from "./pages/BasketPage";
import MainPage from "./pages/MainPage";
import { ProductPage } from "./pages/ProductPage";
import Shop from "./pages/Shop";
import { IProduct } from "./store/types/types";

const RouterElement: React.FC = () => {
  const products = useSelector(ProductsSelector.products);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      handle: {
        crumb: () => <Link to="/">Главная</Link>,
      },
      children: [
        {
          path: "",
          element: <MainPage />,
        },
        {
          path: "catalog",
          handle: {
            crumb: () => <Link to="/catalog">Каталог</Link>,
          },
          children: [
            {
              path: "",
              element: <Shop />,
            },
            {
              path: ":barcode",
              element: <ProductPage />,
              handle: {
                crumb: (data: IProduct) => <p>{data.title}</p>,
              },
              loader: async ({ params }) => {
                return (
                  products.find((e) => e.barcode === params.barcode) ??
                  redirect("/404")
                );
              },
            },
          ],
        },

        {
          path: "admin",
          element: <AdminPage />,
          handle: {
            crumb: () => <p>Админка</p>,
          },
        },
        {
          path: "basket",
          element: <BasketPage />,
          handle: {
            crumb: () => <p>Корзина</p>,
          },
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RouterElement;
