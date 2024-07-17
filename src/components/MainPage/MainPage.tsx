import React from "react";
import s from "./MainPage.module.css"
import { Link } from "react-router-dom";
import Chart from "../Chart/Chart";

type PropsType = {
  getNote(id: number): void;
}

const MainPage: React.FC<PropsType> = ({getNote}) => {
  return (
    <div className={s.createBlock}>
      <p className={s.appDiscription}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia
        deleniti pariatur rerum fugit assumenda eligendi
      </p>
      <Link to={"notes/createNewNote"} onClick={() => getNote(0)}>
        <button className={s.addNewDailyNote}>create new one</button>
      </Link>
      {/* <Chart/> */}
    </div>
  )
};

export default MainPage;