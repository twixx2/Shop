import { combineReducers } from "@reduxjs/toolkit";
import getProductsApi from "../entities/ProductsList/api/getProductsApi";


export const rootReducer = combineReducers({
    [getProductsApi.reducerPath]: getProductsApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;