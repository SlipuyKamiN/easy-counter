import styled from "@emotion/styled";
import { colors, transition } from "~/styles/common/vars";

export const TourerSwitchWrapper = styled.div`
  position: relative;
  margin: auto;

  input {
    opacity: 1;
    position: relative;
    appearance: none;
    outline: none;
    width: 50px;
    height: 28px;
    background-color: ${colors.light.hi200};
    border: 1px solid ${colors.light.hi100};
    border-radius: 50px;
    box-shadow: inset -20px 0 0 0 ${colors.light.hi200};

    transition: all ${transition.duration};
  }

  input:after {
    position: absolute;
    content: "M";

    font-family: inherit;

    top: 2px;
    left: 0px;

    border-radius: 50%;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
    background-color: ${colors.classicWhite};

    text-align: center;
    line-height: 1;
    padding: 5px 7px;
    transition: all ${transition.duration};

    @media screen and (min-width: 768px) {
      top: 1px;
      padding: 6px 7px;
    }
  }

  input:checked {
    border-color: ${colors.hi100};
    box-shadow: inset 20px 0 0 0 ${colors.light.hi100};
  }

  input:checked:after {
    content: "A";
    transform: translateX(23px);
    box-shadow: -2px 4px 3px rgba(0, 0, 0, 0.05);
  }
`;

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
  }

  input:checked + span {
    opacity: 1;
  }
`;

export const Checkbox = styled.input`
  opacity: 0;

  cursor: pointer;
`;
