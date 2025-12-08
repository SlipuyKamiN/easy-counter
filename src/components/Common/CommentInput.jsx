import { useState } from "react";
import { TextInput } from "./Inputs.styled";

export const CommentInput = ({ item, handleChange }) => {
  const [value, setValue] = useState(item.comment || "");

  const onBlur = () => {
    if (value === item.comment) return;

    handleChange(item.id, {
      ...item,
      comment: value,
    });
  };
  return (
    <TextInput
      name="comment"
      type="text"
      value={value}
      onChange={({ target }) => setValue(target.value)}
      onBlur={onBlur}
    />
  );
};
