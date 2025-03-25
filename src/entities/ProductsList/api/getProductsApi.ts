import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductsResponse, Product } from "../model/types";

const URL = 'https://dummyjson.com';

const baseQuery = fetchBaseQuery({
  baseUrl: URL,
});

export const getProductsApi = createApi({
  reducerPath: 'getProductsApi',
  baseQuery,
  endpoints: (builder) => ({
    getProduct: builder.query<ProductsResponse, { page: number; size: number }>({
      query: ({ page, size }) => ({
        url: `/products`,
        params: {
          limit: size,
          skip: (page - 1) * size, 
        },
      }),
      transformResponse: (response: ProductsResponse) => response,
      keepUnusedDataFor: 3000,
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetProductQuery, useLazyGetProductQuery, useGetProductByIdQuery } = getProductsApi;

export default getProductsApi;
