import { useState } from "react";
import { TextInput } from "./Inputs.styled";
import { RxCross2 } from "react-icons/rx";

import {
  ClearInputButton,
  TextInputWrapper,
} from "../CounterPage/CounterPage.styled";

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
    <TextInputWrapper>
      <TextInput
        name="comment"
        type="text"
        value={value}
        onChange={({ target }) => setValue(target.value)}
        onBlur={onBlur}
      />
      {value && (
        <ClearInputButton
          type="button"
          onClick={() => {
            setValue("");
            handleChange(item.id, {
              ...item,
              comment: "",
            });
          }}
        >
          <RxCross2 size={24} />
        </ClearInputButton>
      )}
    </TextInputWrapper>
  );
};
