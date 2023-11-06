import React, { forwardRef } from "react";
import "../styles/SlotMachine2.css";

const Slot = ({ image }, ref) => {
  return (
    <div className="slot" ref={ref}>
      <img src={image} alt="Symbol" width="160" height="165" />
    </div>
  );
};

export default forwardRef(Slot);
