import styled from "@emotion/styled";
import { colors } from "~/styles/common/vars";

export const PageHeader = styled.header`
  width: 100%;
  z-index: 10;
  top: 0;
  left: 0;

  padding: 5px 0;

  backdrop-filter: blur(10px);
  border-bottom: 3px solid ${colors.lo100};
  box-shadow: ${colors.lo100} 0px 0px 10px;

  @media screen and (min-width: 768px) {
    position: fixed;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  flex-wrap: wrap;
  gap: 10px;
`;

export const NavList = styled.ul`
  display: flex;
  margin: 0 auto;
  gap: 30px;
  text-transform: uppercase;

  a:hover,
  a:focus {
    color: ${colors.light.mid100};
  }
`;
