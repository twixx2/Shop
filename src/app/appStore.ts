import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./appReducer";
import getProductsApi from "../entities/ProductsList/api/getProductsApi";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware().concat(getProductsApi.middleware),
})