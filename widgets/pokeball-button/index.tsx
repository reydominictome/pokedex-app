import React, { ComponentProps, ReactNode } from "react";
import { Button } from "@/components/ui/button";

import styles from "./styles.module.scss";
import clsx from "clsx";

interface PokeballButton extends ComponentProps<typeof Button> {
  tooltipClassName?: string;
  children: ReactNode;
}

function PokeballButton({
  tooltipClassName,
  onClick,
  children,
}: PokeballButton) {
  return (
    <div className={styles["pokeball-container"]}>
      <Button className={styles.pokeball} onClick={onClick}>
        <div className={styles["center-button"]}></div>
      </Button>
      <div className={clsx(styles.tooltip, tooltipClassName)}>
        <div className={styles["tooltip-content"]}>{children}</div>
      </div>
    </div>
  );
}

export default PokeballButton;
