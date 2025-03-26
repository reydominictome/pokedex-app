import React from "react";
import styles from "./styles.module.scss";

function PokeballPreloader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className={styles["preloader-container"]}>
      <div className={styles["pokeball-loader"]}></div>
      {text && <p className={styles["loading-text"]}>{text}</p>}
    </div>
  );
}

export default PokeballPreloader;
