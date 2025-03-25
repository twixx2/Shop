import React from 'react';
import { CartItem } from '../../../app/providers/CartProvider';
import './CartWidgetItem.scss';
import { useCart } from '../../../app/providers/CartProvider';
import toast from 'react-hot-toast';

interface CartWidgetItemProps {
    cartItem: CartItem;
}

const CartWidgetItem: React.FC<CartWidgetItemProps> = ({ cartItem }) => {
    const { incrementProduct, decrementProduct, removeProduct } = useCart();

    const discountedPrice = cartItem.product.discountPercentage > 0
        ? Math.round(cartItem.product.price - (cartItem.product.price * cartItem.product.discountPercentage) / 100)
        : cartItem.product.price;

    return (
        <div className="cart-item">
            <div className="cart-item__image">
                <img
                    src={cartItem.product.images && cartItem.product.images.length === 3 ? cartItem.product.images[2] : cartItem.product.thumbnail}
                    alt={cartItem.product.title}
                    loading="lazy" />
            </div>
            <div className="cart-item__details">
                <h3 className="cart-item__title">{cartItem.product.title}</h3>
                <div className="cart-item__price">
                    <span className="cart-item__price-discounted">{discountedPrice} $</span>
                </div>
                <div className="cart-item__controls">
                    <button
                        className="cart-item__btn"
                        onClick={() => decrementProduct(cartItem.product.id)}
                    >
                        −
                    </button>
                    <span className="cart-item__quantity">
                        {cartItem.quantity < 10 ? `0${cartItem.quantity}` : cartItem.quantity}
                    </span>
                    <button
                        className="cart-item__btn"
                        onClick={() => incrementProduct(cartItem.product.id)}
                    >
                        +
                    </button>
                    <button
                        className="cart-item__btn-delete"
                        onClick={() => {
                            removeProduct(cartItem.product.id);
                            toast.error("Товар удален из корзины");
                        }}
                    >
                        ×
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartWidgetItem;
