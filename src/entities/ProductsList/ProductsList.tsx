import React, { useEffect, useState, useMemo } from 'react';
import Loader from "../../shared/ui/Loader/Loader";
import ProductsListItem from "../../shared/ui/ProductsListItem/ProductsListItem";
import { useLazyGetProductQuery } from "./api/getProductsApi";
import { motion } from "framer-motion";
import "./ProductsList.scss";
import { Product } from '../../entities/ProductsList/model/types';
import { useOutletContext } from "react-router-dom";

interface OutletContextType {
  searchValue: string;
  sortCriteria: {
    price: 'asc' | 'desc' | null;
    rating: 'asc' | 'desc' | null;
    stock: 'asc' | 'desc' | null;
  };
}

const ProductsList: React.FC = () => {
  const { searchValue, sortCriteria } = useOutletContext<OutletContextType>();

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const size = 12;
  const [trigger, { isLoading, isFetching}] = useLazyGetProductQuery();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    trigger({ page, size }).then((res: any) => {
      if (!res.error && res.data) {
        if (page === 1) {
          setTotal(res.data.total);
          setProducts(res.data.products);
        } else {
          setProducts(prev => [...prev, ...res.data.products]);
        }
      }
    });
  }, [page, size, trigger]);

  const filteredProducts = useMemo(() => {
    const base = searchValue.length > 0
      ? products.filter(product =>
          product.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      : products;
    const sorted = [...base];

    Object.entries(sortCriteria).forEach(([criterion, order]) => {
      if (order) {
        sorted.sort((a, b) => {
          const aVal = a[criterion as keyof Product];
          const bVal = b[criterion as keyof Product];
          if (typeof aVal === "number" && typeof bVal === "number") {
            return order === "desc" ? bVal - aVal : aVal - bVal;
          }
          if (typeof aVal === "string" && typeof bVal === "string") {
            return order === "desc"
              ? bVal.localeCompare(aVal)
              : aVal.localeCompare(bVal);
          }
          return 0;
        });
      }
    });
    return sorted;
  }, [products, searchValue, sortCriteria]);

  return (
    <div className="products">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="products__item"
          >
            <ProductsListItem product={product} />
          </motion.div>
        ))
      ) : (
        searchValue.length > 0 && (
          <p className="products__not-found">Ничего не найдено</p>
        )
      )}
      {isLoading && page === 1 && <Loader />}
      {searchValue.length === 0 && products.length < total && (
        <button
          className="products__load-more"
          onClick={() => setPage(prev => prev + 1)}
          disabled={isFetching || isLoading}
        >
          {isFetching || isLoading ? "Загрузка..." : "Показать ещё"}
        </button>
      )}
    </div>
  );
};

export default ProductsList;
