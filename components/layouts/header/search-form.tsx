import React, { useState } from "react";
import IcCircleClose from "assets/icons/IcCircleClose";
import IcSearchArrowRight from "assets/icons/IcSearchArrowRight";
import { useRouter } from "next/router";
const SearchForm = ({
  searchOpen,
  closeSearch,
  isMobileAndTablet,
  siteHeaderHeight,
}) => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const handleSearch = () => {
    router.push("/search?search=" + search);
    closeSearch();
  };
  return (
    <form
      // ref={searchRef}
      className={`search-form ${searchOpen ? "search-form--active" : ""}`}
    >
      <div className="pp-container">
        <IcCircleClose className="icon-cancel" onClick={closeSearch} style={{top: `calc(${siteHeaderHeight}px + 20px)`}} />

        <div className="search-form__input">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            name="search"
            placeholder="Type to Search"
          />
          <IcSearchArrowRight
            onClick={handleSearch}
            className="search-form__submit"
          />
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
