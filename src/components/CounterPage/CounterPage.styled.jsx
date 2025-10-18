import styled from "@emotion/styled";
import { colors, transition } from "~/styles/common/vars";

export const CounterList = styled.ul`
  margin: 0 auto;
`;

export const AddressesListItem = styled.li`
  margin: 0 auto;
  max-width: 375px;
  padding: 10px;
  transition: ${transition.duration};
  border-radius: 12px;

  a {
    width: 100%;
    height: 100%;
    padding: 15px;
  }

  &:hover,
  &:focus {
    background-color: ${colors.light.hi200};
  }

  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
`;

export const Heading = styled.h1`
  margin: 0 auto;
  font-size: 24px;
  max-width: 320px;

  @media screen and (min-width: 768px) {
    font-size: 28px;
    max-width: none;
  }

  @media screen and (min-width: 1280px) {
    font-size: 32px;
  }
`;

export const PickupWrapper = styled.li`
  margin: 0 auto;
  max-width: 230px;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

export const CounterItem = styled.li`
  h4 {
    text-transform: capitalize;
    margin-bottom: 10px;
  }

  div {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 10px;

    input {
      font-size: 30px;
      max-width: 60px;
      text-align: center;
      border: none;

      background-color: transparent;
    }

    button {
      width: 36px;
      height: 36px;
      padding: 0;

      color: ${colors.light.lo200};
      background-color: transparent;
      border-radius: 50%;
      font-size: 30px;
      font-weight: 600;
      line-height: 0;

      border: 1px solid ${colors.light.hi100};
      transition: ${transition.duration};

      &:hover,
      &:focus {
        color: ${colors.light.hi200};
        background-color: ${colors.light.mid100};
      }
    }
  }
`;
