import styled from "@emotion/styled";
import { colors, transition } from "~/styles/common/vars";

export const CheckboxWrapper = styled.div`
  position: relative;
  width: 34px;
  height: 34px;
  margin: 0 auto;

  border: 1px solid ${colors.light.hi100};
  color: ${colors.light.lo200};
  border-radius: 12px;

  span {
    opacity: 0;
    position: absolute;
    top: 3px;
    left: 2px;

    pointer-events: none;

    transition: ${transition.duration};
  }

  input {
    width: 34px;
    height: 34px;

    background-color: transparent;
  }

  input:checked + span {
    opacity: 1;
  }
`;

export const Checkbox = styled.input`
  opacity: 0;

  cursor: pointer;
`;
