import * as React from "react";
import "./styles.css";
import * as Progress from "@radix-ui/react-progress";

const ProgressBar = ({ value, max }: { value: number; max: number; }) => {
  return (
    <Progress.Root className="ProgressRoot" value={value} max={max}>
      <Progress.Indicator
        className="ProgressIndicator"
        style={{ transform: `translateX(-${100 - (value / max) * 100}%)` }}
      />
    </Progress.Root>
  );
};

export default ProgressBar;
