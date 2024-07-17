import React from "react";
import { Link } from "react-router-dom";
import s from "./CloseButton.module.css"

const CloseButton = () => {
  return <Link to="/" className={s.closeButton}></Link>
};

export default CloseButton;