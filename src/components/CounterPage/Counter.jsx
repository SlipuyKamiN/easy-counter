import { useEffect, useState } from "react";
import { CounterItem } from "./CounterPage.styled";

export const Counter = ({ name, available, handleChange, itemKey }) => {
  const [qty, setQty] = useState(available);

  useEffect(() => {
    if (qty < 0) return;
    if (qty !== available) {
      handleChange({ name, qty: Number(qty), itemKey });
    }
  }, [available, handleChange, itemKey, name, qty]);

  return (
    <CounterItem>
      <h3>{name}</h3>
      <div>
        <button
          type="button"
          disabled={qty <= 0}
          onClick={() => setQty((prev) => prev - 1)}
        >
          -
        </button>
        <input
          type="tel"
          min={0}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          onFocus={(e) => e.target.select()}
        />
        <button type="button" onClick={() => setQty((prev) => prev + 1)}>
          +
        </button>
      </div>
    </CounterItem>
  );
};
