import { Link, NavLink } from "react-router-dom";
import { HeaderWrapper, NavList, PageHeader } from "./Header.styled";
import { Container } from "../SharedLayout/SharedLayout.styled";
import { PageLogo } from "../Common/PageLogo";

const Header = () => (
  <PageHeader>
    <Container>
      <HeaderWrapper>
        <PageLogo />
        <NavList>
          <li>
            <NavLink to={"/"}>Counter list</NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard"}>Dashboard</NavLink>
          </li>
        </NavList>
      </HeaderWrapper>
    </Container>
  </PageHeader>
);

export default Header;
