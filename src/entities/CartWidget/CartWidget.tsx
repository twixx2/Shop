import React from 'react';
import { useCart } from "../../app/providers/CartProvider";
import CartWidgetItem from "../../shared/ui/CartWidgetItem/CartWidgetItem";
import "./CartWidget.scss";

const CartWidget: React.FC = () => {
  const { cartItems, totalPrice } = useCart();

  return (
    <div className="cart">
      {cartItems.map(item => (
        <CartWidgetItem key={item.product.id} cartItem={item} />
      ))}
      <div className="cart__total">
        {
            cartItems.length === 0 ? <h2>Товаров пока нет</h2> : ''
        }
        Итого: {totalPrice} $
      </div>
    </div>
  );
};

export default CartWidget;
