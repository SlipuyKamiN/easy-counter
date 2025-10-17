import { useEffect, useState } from "react";

export const Counter = ({ name, available, handleChange, itemKey }) => {
  const [qty, setQty] = useState(available);

  useEffect(() => {
    if (qty !== available) {
      handleChange({ name, qty: Number(qty), itemKey });
    }
  }, [available, handleChange, itemKey, name, qty]);

  return (
    <li>
      <h4>{name}</h4>
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
    </li>
  );
};
