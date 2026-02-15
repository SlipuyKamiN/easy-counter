import styled from "@emotion/styled";

export const CartList = styled.ul`
  padding: 20px;
  text-align: left;
`;

export const NewCartItem = styled.ul`
  display: flex;
  gap: 5px;
  align-items: center;

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
