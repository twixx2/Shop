import React from 'react';
import './ProductsListItem.scss';
import { Product } from '../../../entities/ProductsList/model/types';
import { useCart } from '../../../app/providers/CartProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface ProductListItemProps {
  product: Product;
}

const ProductsListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const limitedStrLength = (str: string, maxLength: number): string => {
    return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
  };

  const roundDiscount = (discount: number): number => {
    return discount < 1 ? 0 : Math.round(discount);
  };

  const calculateDiscountedPriceRounded = (price: number, discount: number): number => {
    const effectiveDiscount = roundDiscount(discount);
    const discounted = price - (price * effectiveDiscount) / 100;
    return Math.round(discounted);
  };

  const hasDiscount = roundDiscount(product.discountPercentage) > 0;
  const discountedPrice = hasDiscount
    ? calculateDiscountedPriceRounded(product.price, product.discountPercentage)
    : product.price;

  const { addProduct } = useCart();

  const navigate = useNavigate();

  const handleClick = () => {
    if (product.stock > 0) {
      navigate(`/product/${product.id}`);
    } else {
      toast.error("Товара нет в наличии");
    }
  };


  return (
    <div className="product" onClick={() => { handleClick() }}>
      <div className="product__left">
        <img
          src={product.images && product.images.length === 3 ? product.images[2] : product.thumbnail}

          alt={product.title}
          loading="lazy"
          className="product__image"
        />

      </div>
      <div className="product__right">
        <div className="product__header">
          <h4 className="product__title">{product.title}</h4>
          <div className="product__price">
            {hasDiscount ? (
              <>
                <span className="product__price-original">{product.price}&nbsp;$</span>
                <span className="product__price-discounted">{discountedPrice} $</span>

              </>
            ) : (
              <span>{product.price}&nbsp;$</span>
            )}
          </div>
        </div>
        <p className="product__description">
          {limitedStrLength(product.description, 40)}
        </p>
        <div className="product__extra">
          {product.brand && (
            <span className="product__brand">Бренд: {product.brand}</span>
          )}
          {hasDiscount && (
            <span className="product__discount">
              Скидка: {roundDiscount(product.discountPercentage)}%
            </span>
          )}
          {typeof product.stock === 'number' && (
            <span className="product__stock">В наличии: {product.stock}</span>
          )}
        </div>
        <div className="product__rating">
          <span>{product.rating}</span>
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.75095 10.0934L5.58045 8.42743L2.40873 10.0934L3.01588 6.56229L0.447662 4.06207L3.99338 3.54722L5.58045 0.285645L7.16752 3.54722L10.7132 4.06207L8.14502 6.5635L8.75095 10.0934Z"
              fill="#FFC529"
            />
          </svg>
        </div>
        <button
          className="product__btn-cart"
          onClick={(e) => {
            e.stopPropagation();
            addProduct(product);
          }}
        >
          В корзину
        </button>
      </div>
    </div>
  );
};

export default ProductsListItem;
