import styled from "@emotion/styled";
import { colors } from "~/styles/common/vars";

export const SectionsList = styled.ul`
  padding: 10px;
  text-align: left;
`;

export const SectionItem = styled.li`
  h3 {
    margin-bottom: 5px;
  }

  &:not(:last-of-type) {
    margin-bottom: 15px;
  }
`;

export const CheckItem = styled.li`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;

  padding: 5px;

  border-bottom: 1px solid ${colors.light.mid100};

  &:not(:last-of-type) {
    margin-bottom: 10px;
  }

  div {
    margin: 0;
  }
`;
