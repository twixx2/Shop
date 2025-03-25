export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    images: string[];
    rating: number;
    price: number;
    stock: number;
    discountPercentage: number; 
    brand: string;
}
  