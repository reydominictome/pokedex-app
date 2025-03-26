import React, { ComponentProps, ReactNode } from "react";
import { Button } from "@/components/ui/button";

import styles from "./styles.module.scss";

interface PokeballButton extends ComponentProps<typeof Button> {
  children: ReactNode;
}

const PokeballButton = ({ onClick, children }: PokeballButton) => {
  return (
    <div className={styles["pokeball-container"]}>
      <Button className={styles.pokeball} onClick={onClick}>
        <div className={styles["center-button"]}></div>
      </Button>
      <div className={styles.tooltip}>
        <div className={styles["tooltip-content"]}>{children}</div>
      </div>
    </div>
  );
};

export default PokeballButton;
