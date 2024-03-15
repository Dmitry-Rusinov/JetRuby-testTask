import React from "react";
import styles from "./Button.module.scss";

function Button({ text, onClick, type="button", size, weight, margin }) {
  return (
    <button
    className={styles.button}
      style={{ fontSize: size, fontWeight: weight, margin: margin }}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
