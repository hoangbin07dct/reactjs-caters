import React from "react";
import btnStyle from "../../Styles/Button.module.scss";

const Button = ({ type, textFill, handleClick }) => {
  const classType = `btn--${type}`;
  const classStyle = type
    ? `${btnStyle.btn} ${btnStyle[classType]}`
    : btnStyle.btn;
  return (
    <button className={classStyle} onClick={handleClick}>
      {textFill}
    </button>
  );
};
export default Button;
