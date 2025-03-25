import React from "react";
import { useLocation } from "react-router-dom";
import "./navbar.scss";
import TextField from "../TextField/TextField";

interface NavBarProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  sortCriteria: {
    price: 'asc' | 'desc' | null;
    rating: 'asc' | 'desc' | null;
    stock: 'asc' | 'desc' | null;
  };
  setSortCriteria: React.Dispatch<React.SetStateAction<{
    price: 'asc' | 'desc' | null;
    rating: 'asc' | 'desc' | null;
    stock: 'asc' | 'desc' | null;
  }>>;
}

const NavBar: React.FC<NavBarProps> = ({ searchValue, setSearchValue, sortCriteria, setSortCriteria }) => {
  const location = useLocation();

  // Если мы на странице корзины, отображаем только заголовок "Корзина"
  if (location.pathname === '/cart') {
    return (
      <nav className="nav">
        <div className="nav__content container">
          <h1>Корзина</h1>
        </div>
      </nav>
    );
  }


  const toggleSort = (criterion: "price" | "rating" | "stock") => {
    setSortCriteria(prev => {
      const current = prev[criterion];
      let newState: 'asc' | 'desc' | null;
      if (current === null) newState = 'desc';
      else if (current === 'desc') newState = 'asc';
      else newState = null;
      return { ...prev, [criterion]: newState };
    });
  };

  return (
    <nav className="nav">
      <div className="nav__content container">
        <h1>Каталог</h1>
        <div className="nav__sort">
          <div className="nav__sort-label">Сортировать по:</div>
          <div className="nav__sort-options">
            <button
              className={`nav__sort-option ${sortCriteria.price ? "active" : ""}`}
              onClick={() => toggleSort("price")}
            >
              Цена
              {sortCriteria.price === "desc" && (
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path d="M6 4l4 4H2z" fill="currentColor" />
                </svg>
              )}
              {sortCriteria.price === "asc" && (
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path d="M6 8l-4-4h8z" fill="currentColor" />
                </svg>
              )}
            </button>
            <button
              className={`nav__sort-option ${sortCriteria.rating ? "active" : ""}`}
              onClick={() => toggleSort("rating")}
            >
              Рейтинг
              {sortCriteria.rating === "desc" && (
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path d="M6 4l4 4H2z" fill="currentColor" />
                </svg>
              )}
              {sortCriteria.rating === "asc" && (
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path d="M6 8l-4-4h8z" fill="currentColor" />
                </svg>
              )}
            </button>
            <button
              className={`nav__sort-option ${sortCriteria.stock ? "active" : ""}`}
              onClick={() => toggleSort("stock")}
            >
              Кол-во
              {sortCriteria.stock === "desc" && (
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path d="M6 4l4 4H2z" fill="currentColor" />
                </svg>
              )}
              {sortCriteria.stock === "asc" && (  
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path d="M6 8l-4-4h8z" fill="currentColor" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <TextField
          className="nav__content-search"
          onChange={(val) => setSearchValue(val)}
          type="text"
          value={searchValue}
          placeholder="Введите название"
        />
      </div>
    </nav>
  );
};

export default NavBar;
