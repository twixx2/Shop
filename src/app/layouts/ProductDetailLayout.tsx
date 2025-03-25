import React from "react";
import { Outlet } from "react-router-dom";
import { CartProvider } from "../../app/providers/CartProvider";

const ProductDetailLayout: React.FC = () => {
  return (
    <CartProvider>
      <div className="product-detail-layout">
        <Outlet />
      </div>
    </CartProvider>
  );
};

export default ProductDetailLayout;
