"use client";

import {PropsWithChildren, createContext, useContext, useState} from "react";

interface CategoryContextValue {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const CategoryContext = createContext<CategoryContextValue>(
  {} as CategoryContextValue,
);

export const CategoryProvider = (props: PropsWithChildren) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <CategoryContext.Provider value={{selectedCategory, setSelectedCategory}}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);

export default CategoryProvider;
