import styled from "@emotion/styled";
import { colors, transition } from "~/styles/common/vars";

export const DeleteBtn = styled.button`
  position: relative;
  width: 35px;
  height: 35px;

  background-color: transparent;
  border: none;

  transition: ${transition.duration};

  & span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;

    transition: ${transition.duration};
  }

  &:hover,
  &:focus {
    color: transparent;
  }

  &:hover span,
  &:focus span {
    opacity: 1;
    color: ${colors.errorRed};
  }
`;

export const Th = styled.th`
  max-width: 105px;
  text-align: center;
`;

export const Td = styled.td`
  text-align: center;
`;

export const NumberInput = styled.input`
  width: 40px;
  height: 20px;
  padding: 0;
  text-align: center;
  font-size: 20px;
  background-color: transparent;
  border: none;
`;
