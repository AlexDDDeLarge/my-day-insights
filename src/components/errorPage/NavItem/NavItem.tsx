import React from "react";
import { Link } from "react-router-dom";
import { NoteType } from "../../../redux/notes/notesReducer";

type PropsType = {
  item: NoteType;
  getNote(id: number): void;
};

const NavItem: React.FC<PropsType> = ({ item, getNote }) => {
  return (
    <Link
      to={`notes/${item.id}`}
      onClick={() => getNote(item.id)}
      key={item.id}
    >
      <li className="dailyNote">
        <span className="dailyNoteDate">{item.date}</span>
        {item.isFavorite ? (
          <div className="isFavorite"></div>
        ) : (
          <div className="isNotFavorite"></div>
        )}
      </li>
    </Link>
  );
};

export default NavItem;
