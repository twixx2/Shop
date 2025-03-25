import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./TabBarView.scss";
import NavBar from "../NavBar/NavBar";

interface TabBarViewProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
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

const TabBarView: React.FC<TabBarViewProps> = ({ searchValue, setSearchValue, sortCriteria, setSortCriteria }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/products');
  }, [navigate]);
  
  return (
    <section className="view">
      <NavBar 
        searchValue={searchValue} 
        setSearchValue={setSearchValue}
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
      />
      <Outlet context={{ searchValue, sortCriteria }} />
    </section>
  );
};

export default TabBarView;
