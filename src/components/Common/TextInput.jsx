import { useState } from "react";
import { Text } from "./Inputs.styled";

export const TextInput = ({ item, handleChange }) => {
  const [value, setValue] = useState(item.comment || "");

  const onBlur = () => {
    if (value === item.comment) return;

    handleChange(item.id, {
      ...item,
      comment: value,
    });
  };
  return (
    <Text
      type="text"
      value={value}
      onChange={({ target }) => setValue(target.value)}
      onBlur={onBlur}
    />
  );
};
