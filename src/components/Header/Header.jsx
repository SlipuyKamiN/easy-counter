import { Link, NavLink } from "react-router-dom";
import {
  ArrowLogo,
  FirstLetterLogo,
  HeaderWrapper,
  LogoLink,
  NavList,
  PageHeader,
  SubLogo,
} from "./Header.styled";
import { Container } from "../SharedLayout/SharedLayout.styled";

const Header = () => (
  <PageHeader>
    <Container>
      <HeaderWrapper>
        <LogoLink to={"/"}>
          <FirstLetterLogo>e</FirstLetterLogo>asyRing<ArrowLogo>↺</ArrowLogo>
          <SubLogo>counter</SubLogo>
        </LogoLink>
        <NavList>
          <li>
            <NavLink to={"/"}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to={"/counterList"}>Counter</NavLink>
          </li>
        </NavList>
      </HeaderWrapper>
    </Container>
  </PageHeader>
);

export default Header;
