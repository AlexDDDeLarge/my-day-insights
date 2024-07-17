import React from "react";
import { Link } from "react-router-dom";
import s from "./Header.module.css";
import logo from "./../../assets/diary.png";
import c from "classnames";

type PropsType = {
  setIsSidebarShown([key]: any): void;
  setIsFavoriteShown([key]: any): void;
  setShowingSidebar([key]: any): void;
  isFavoriteShown: boolean;
  isSidebarShown: boolean;
  location: any;
};

const Header: React.FC<PropsType> = ({
  setIsSidebarShown,
  setIsFavoriteShown,
  isFavoriteShown,
  isSidebarShown,
  setShowingSidebar,
  location,
}) => {
  return (
    <header className={s.header}>
      <use></use>
      <div className={s.logo}>
        <Link to="/">
          <img src={logo} alt="logo" width="40" />
        </Link>
      </div>
      <Link
        to="notes/search"
        className={c(s.headerButton, s.headerButtonSearch)}
        onClick={() => setIsSidebarShown(false)}
      >
        <svg
          className={c({
            [s.searchIsOppened]: location.pathname === "/notes/search",
          })}
        >
          <use xlinkHref="#searchIco"></use>
        </svg>
      </Link>
      <button
        className={c(s.headerButton, s.favoriteButton)}
        onClick={() => {
          setIsFavoriteShown(isFavoriteShown ? false : true);
          setIsSidebarShown(true);
        }}
      >
        <svg
          className={c({
            [s.isFavoriteShown]: isFavoriteShown && isSidebarShown,
          })}
        >
          <use xlinkHref="#heartIco"></use>
        </svg>
      </button>
      <button
        className={c(s.headerButton, s.showSidebarButton)}
        onClick={setShowingSidebar}
      >
        <svg>
          <use xlinkHref={isSidebarShown ? "#crossIco" : "#listIco"}></use>
        </svg>
      </button>
    </header>
  );
};

export default Header;
