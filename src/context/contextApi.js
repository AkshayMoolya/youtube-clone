import { createContext, useEffect, useState } from "react";
import { fetchdata } from "../utilis/api";

export const Context = createContext();

export const AppContext = (props) => {
  const [loading, setloading] = useState(false);
  const [searchResults, setsearchResults] = useState(false);
  const [selectedCategories, setselectedCategories] = useState("new");
  const [mobileMenu, setmobileMenu] = useState(false);

  useEffect(() => {
    fetchSelectedCategoriesData(selectedCategories);
  }, [selectedCategories]);

  const fetchSelectedCategoriesData = (query) => {
    setloading(true);
    fetchdata(`search/?q=${query}`).then(({ contents }) => {
      console.log(contents);
      setsearchResults(contents);
      setloading(false);
    });
  };

  return (
    <Context.Provider
      value={{
        loading,
        setloading,
        searchResults,
        setsearchResults,
        selectedCategories,
        setselectedCategories,
        mobileMenu,
        setmobileMenu,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
