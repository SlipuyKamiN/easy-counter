import styled from "@emotion/styled";
import { ConfirmButton } from "../CounterPage/CounterPage.styled";
import { colors } from "~/styles/common/vars";

export const CartList = styled.ul`
  padding: 20px;
  text-align: left;

  & > li:not(:last-of-type) {
    margin-bottom: 5px;
  }
`;

export const CartHeading = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > ul {
    display: flex;
    gap: 10px;
  }
`;

export const NewCartItem = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;

  li:first-of-type {
    input {
      max-width: 88px;
    }
  }
  li:nth-of-type(3) {
    input {
      max-width: 70px;
    }
  }
`;

export const CartButton = styled(ConfirmButton)`
  position: relative;

  max-width: 80px;
  padding: 5px 10px;

  * {
    color: inherit;
  }

  &.copied {
    color: ${colors.success};
  }
`;
