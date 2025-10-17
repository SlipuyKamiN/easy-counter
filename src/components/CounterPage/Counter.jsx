import { useState } from "react";

export const Counter = ({ name, available, handleChange, itemKey }) => {
  const [qty, setQty] = useState(available);

  const updateCounter = () => {
    if (qty !== available) {
      handleChange({ name, qty: Number(qty), itemKey });
    }
  };

  return (
    <li>
      <h4>{name}</h4>
      <button
        type="button"
        onClick={() => setQty((prev) => prev - 1)}
        onBlur={updateCounter}
      >
        -
      </button>
      <input
        type="number"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        onBlur={updateCounter}
      />
      <button
        type="button"
        onClick={() => setQty((prev) => prev + 1)}
        onBlur={updateCounter}
      >
        +
      </button>
    </li>
  );
};
