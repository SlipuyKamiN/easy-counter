import styled from "@emotion/styled";
import { colors, transition } from "~/styles/common/vars";

export const CounterItem = styled.li`
  margin-bottom: 20px;

  h3 {
    text-transform: capitalize;
    margin-bottom: 5px;
  }

  div {
    display: flex;
    justify-content: center;
    gap: 15px;
  }
`;

export const CounterInput = styled.input`
  font-size: 30px;
  width: 90px;
  text-align: center;
  border: none;
  padding: 0;

  background-color: transparent;
  border-bottom: 1px solid ${colors.light.hi100};
`;

export const CounterButton = styled.button`
  width: 40px;
  height: 40px;
  padding: 0;

  color: ${colors.light.lo200};
  background-color: transparent;
  border-radius: 50%;
  font-size: 36px;
  font-weight: 600;
  line-height: 0;

  border: 1px solid ${colors.light.hi100};
  transition: ${transition.duration};

  &:hover,
  &:focus {
    color: ${colors.light.hi200};
    background-color: ${colors.light.mid100};
  }

  &:disabled {
    color: ${colors.light.hi200};
  }
`;

export const TextInputWrapper = styled.div`
  position: relative;

  max-width: 240px;
  margin: 0 auto;
`;

export const ClearInputButton = styled(CounterButton)`
  position: absolute;
  right: 1px;
  top: 1px;

  height: 32px;
  width: 32px;

  border: none;
  background-color: ${colors.classicWhite};
`;
