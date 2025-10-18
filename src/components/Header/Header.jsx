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
            <NavLink to={"/"}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to={"/counterList"}>Counter list</NavLink>
          </li>
        </NavList>
      </HeaderWrapper>
    </Container>
  </PageHeader>
);

export default Header;
