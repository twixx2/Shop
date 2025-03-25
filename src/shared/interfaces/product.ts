import { Product } from "../../entities/ProductsList/model/types";

export interface ProductsResponse {
    count: number;
    next: string;
    previous: string;
    results: Product[];
}