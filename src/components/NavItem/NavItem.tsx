import React from "react";
import { NavLink } from "react-router-dom";
import { NoteType } from "../../types/types";
import s from "./NavItem.module.css";
import c from "classnames";

type PropsType = {
  item: NoteType;
  getNote(id: number): void;
  setOnClick?(e?: any): void;
};

const NavItem: React.FC<PropsType> = ({ item, getNote, setOnClick }) => {
  let mood;
  switch (item.mood) {
    case "awful":
      mood = <>&#x1F61E;</>;
      break;
    case "bad":
      mood = <>&#x1F614;</>;
      break;
    case "calm":
      mood = <>&#x1F610;</>;
      break;
    case "good":
      mood = <>&#x1F60C;</>;
      break;
    case "happy":
      mood = <>&#x1F60A;</>;
      break;
  }

  return (
    <NavLink
      to={`notes/${item.id}`}
      onClick={() => {
        getNote(item.id); 
        if (setOnClick) setOnClick();
      }}
      key={item.id}
      className={s.link}
    >
      <li className="dailyNote">
        <span className={s.emoji}>{mood}</span>
        <span className="dailyNoteDate">{item.date}</span>
        {item.isFavorite ? (
          <div className="isFavorite"></div>
        ) : (
          <div className="isNotFavorite"></div>
        )}
      </li>
    </NavLink>
  );
};

export default NavItem;
