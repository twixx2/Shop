import React, { useState } from "react";
import TabBar from "../../../shared/ui/TabBar/TabBar";
import TabBarView from "../../../shared/ui/TabBarView/TabBarView";
import Wrapper from "../../../shared/ui/Wrapper/Wrapper";

const HomePage: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [sortCriteria, setSortCriteria] = useState<{
    price: 'asc' | 'desc' | null;
    rating: 'asc' | 'desc' | null;
    stock: 'asc' | 'desc' | null;
  }>({
    price: null,
    rating: null,
    stock: null,
  });

  return (
    <Wrapper>
      <TabBarView
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
      />
      <TabBar />
    </Wrapper>
  );
};

export default HomePage;
