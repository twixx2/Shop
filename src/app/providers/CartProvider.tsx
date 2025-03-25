import { createContext, useContext, useState, useEffect, useRef } from "react";
import { Product } from "../../entities/ProductsList/model/types";
import { toast } from "react-hot-toast";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addProduct: (product: Product) => void;
  incrementProduct: (productId: number) => void;
  decrementProduct: (productId: number) => void;
  removeProduct: (productId: number) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const isAddingRef = useRef(false);

  const addProduct = (product: Product) => {
    if (product.stock <= 0) {
      toast.error("Товара нет в наличии");
      return;
    }

    if (isAddingRef.current) return;
    isAddingRef.current = true;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing && existing.quantity >= product.stock) {
        toast.error("Товара нет в наличии");
        return prev;
      }
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
    toast.success("Товар добавлен в корзину");

    setTimeout(() => {
      isAddingRef.current = false;
    }, 500);
  };

  const incrementProduct = (productId: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementProduct = (productId: number) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeProduct = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const discountedPrice =
      item.product.discountPercentage > 0
        ? Math.round(item.product.price - (item.product.price * item.product.discountPercentage) / 100)
        : item.product.price;
    return acc + discountedPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addProduct,
        incrementProduct,
        decrementProduct,
        removeProduct,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("Ошибка получения контекста");
  }
  return context;
};
