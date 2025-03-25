import { createBrowserRouter, RouteObject } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import { HomePage } from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage/ui/ErrorPage";
import { AuthPage } from "../pages/AuthPage";
import { RegisterPage } from "../pages/RegisterPage";
import ProductsList from "../entities/ProductsList/ProductsList";
import CartWidget from "../entities/CartWidget/CartWidget";
import ProfileData from "../entities/ProfileData/ProfileData";
import ProductDetailPage from "../pages/ProductDetailPage/ui/ProductDetailPage";
import ProductDetailLayout from "./layouts/ProductDetailLayout";


const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
    children: [
      { path: '/products', element: <ProductsList /> },
      { path: '/cart', element: <CartWidget /> },
      { path: '/profile', element: <ProfileData /> },
    ]
  },
  { path: '/auth', element: <AuthPage /> },
  { path: '/registration', element: <RegisterPage /> },
  { 
    path: '/product/:id', 
    element: <ProductDetailLayout />, 
    children: [
      { path: '', element: <ProductDetailPage /> }
    ]
  }
];

const appRouter = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: routes,
    errorElement: <ErrorPage />
  }
]);

export default appRouter;
