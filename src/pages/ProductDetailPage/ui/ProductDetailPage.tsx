import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../../shared/ui/Loader/Loader";
import { useGetProductByIdQuery } from "../../../entities/ProductsList/api/getProductsApi";
import "./ProductDetailPage.scss";
import { toast } from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useCart } from "../../../app/providers/CartProvider";

const roundDiscount = (discount: number): number => {
  return discount < 1 ? 0 : Math.round(discount);
};

const calculateDiscountedPriceRounded = (price: number, discount: number): number => {
  const effectiveDiscount = roundDiscount(discount);
  const discounted = price - (price * effectiveDiscount) / 100;
  return Math.round(discounted);
};

const ProductDetailPage: React.FC = () => {
  const { addProduct } = useCart();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id!);

  if (isLoading)
    return (
      <div className="product-detail">
        <Loader />
      </div>
    );
  if (error || !product) {
    toast.error("Ошибка загрузки товара");
    return (
      <div className="product-detail__error">Ошибка загрузки товара</div>
    );
  }

  const hasDiscount = roundDiscount(product.discountPercentage) > 0;
  const discountedPrice = hasDiscount
    ? calculateDiscountedPriceRounded(product.price, product.discountPercentage)
    : product.price;


  return (
    <div className="product-detail">
      <div className="product-detail__header">
        <button
          className="product-detail__back-btn"
          onClick={() => navigate("/products")}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
            />
          </svg>
        </button>
      </div>
      <div className="product-detail__container">
        <div className="product-detail__left">
          {product.images && product.images.length > 0 ? (
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={10}
              slidesPerView={1}
              className="product-detail__swiper"
            >
              {product.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    className="product-detail__image"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-detail__image"
            />
          )}
        </div>
        <div className="product-detail__right">
          <h1 className="product-detail__title">{product.title}</h1>
          <p className="product-detail__description">{product.description}</p>
          <div className="product-detail__prices">
            {hasDiscount && (
              <span className="product-detail__price-original">
                {product.price}&nbsp;$
              </span>
            )}
            <span
              className={`product-detail__price ${hasDiscount ? "discounted" : ""
                }`}
            >
              {discountedPrice}&nbsp;$
            </span>
          </div>
          <div className="product-detail__info">
            {product.brand && (
              <span className="product-detail__chip">
                Бренд: {product.brand}
              </span>
            )}
            {hasDiscount && (
              <span className="product-detail__chip">
                Скидка: {roundDiscount(product.discountPercentage)}%
              </span>
            )}
            {typeof product.stock === "number" && (
              <span className="product-detail__chip">
                В наличии: {product.stock}
              </span>
            )}
            {typeof product.rating === "number" && (
              <span className="product-detail__chip">
                Рейтинг: {product.rating}
              </span>
            )}
          </div>
          <button
            className="product-detail__btn-cart"
            onClick={() => {
              addProduct(product);
              toast.success('Товар добавлен в корзину');
            }}
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
