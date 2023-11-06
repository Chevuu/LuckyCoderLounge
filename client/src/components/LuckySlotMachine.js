import React, { useRef, useState } from "react";
import Slot from "./Slot";
import "../styles/SlotMachine2.css";

const SlotMachine = ({ numberOfSlots }) => {
  const slotRefs = useRef([]);
  const [isSpinning, setIsSpinning] = useState(false);

  const columns = Array.from({ length: 5 }, (_, columnIndex) => {
    const randomImages = Array.from({ length: numberOfSlots }, (_, index) => {
      const randomImageNumber = Math.floor(Math.random() * 9) + 1;
      return `/slot-images/fruits/cropped/img${randomImageNumber}.png`;
    });

    return Array.from({ length: numberOfSlots }, (_, index) => ({
      id: index,
      image: randomImages[index],
    }));
  });

  const startAnimation = () => {
    setIsSpinning(true); // Disable the button

    columns.forEach((column, columnIndex) => {
      column.forEach((slot, index) => {
        if (
          slotRefs.current[columnIndex][index] &&
          slotRefs.current[columnIndex][index].style
        ) {
          slotRefs.current[columnIndex][
            index
          ].style.transform = `translateY(-879px)`;
        }
      });
    });

    setTimeout(() => {
      setIsSpinning(false);
    }, 1100); // Assuming the animation duration is 1.1 seconds
  };

  return (
    <div className="container">
      <div className="slot-machine-container">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="slot-column">
            {column.map((slot, index) => (
              <Slot
                key={slot.id}
                image={slot.image}
                ref={(el) => {
                  if (!slotRefs.current[columnIndex]) {
                    slotRefs.current[columnIndex] = [];
                  }
                  slotRefs.current[columnIndex][index] = el;
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <button
        className="spin-button"
        onClick={startAnimation}
        disabled={isSpinning}
      >
        Spin
      </button>
    </div>
  );
};

export default SlotMachine;
