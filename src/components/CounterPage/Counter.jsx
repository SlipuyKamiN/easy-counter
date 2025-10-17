import { useEffect, useState } from "react";
import { CounterItem } from "./CounterPage.styled";

export const Counter = ({ name, available, handleChange, itemKey }) => {
  const [qty, setQty] = useState(available);

  useEffect(() => {
    if (qty !== available) {
      handleChange({ name, qty: Number(qty), itemKey });
    }
  }, [available, handleChange, itemKey, name, qty]);

  return (
    <CounterItem>
      <h4>{name}</h4>
      <div>
        <button type="button" onClick={() => setQty((prev) => prev - 1)}>
          -
        </button>
        <input
          type="number"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />
        <button type="button" onClick={() => setQty((prev) => prev + 1)}>
          +
        </button>
      </div>
    </CounterItem>
  );
};
