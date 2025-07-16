import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import App from "../App";
import OrderPage from "../pages/OrderPage";
import CategoryDetailsPage from "../pages/CategoryDetailsPage ";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App contains Layout (Navbar + Footer)
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/order",
        element: <OrderPage />,
      },
      {
        path: "/category/:categoryName",
        element: <CategoryDetailsPage />,
      },
    ],
  },
]);