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
  border: 1px solid ${colors.light.hi100};

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
  margin-bottom: 10px;

  @media screen and (min-width: 768px) {
    font-size: 28px;
    max-width: none;
  }

  @media screen and (min-width: 1280px) {
    font-size: 32px;
  }
`;

export const PickupWrapper = styled.li`
  margin: 0 auto 10px;
  max-width: 190px;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

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

    input {
      font-size: 30px;
      width: 90px;
      text-align: center;
      border: none;
      padding: 0;

      background-color: transparent;
      border-bottom: 1px solid ${colors.light.hi100};
    }

    button {
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
    }
  }
`;
