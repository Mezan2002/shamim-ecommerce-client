import { Route, Routes } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import Home from "@/pages/Home/Home";
import ProductDetails from "@/pages/Products/ProductDetails";
import ProductList from "@/pages/Products/ProductList";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/:id" element={<ProductDetails />} />
      </Route>
    </Routes>
  );
};
export default AppRoutes;
