import { NavLink, useParams } from "react-router-dom";
import { HeaderWrapper, NavList, PageHeader } from "./Header.styled";
import { Container } from "../SharedLayout/SharedLayout.styled";
import { PageLogo } from "../Common/PageLogo";

const Header = () => {
  const { user } = useParams();
  const isAdmin = user === "admin-1001" || user === "test-1001";

  return (
    <PageHeader>
      <Container>
        <HeaderWrapper>
          <PageLogo />
          {isAdmin && (
            <NavList>
              <li>
                <NavLink to={`/${user}`}>Counter list</NavLink>
              </li>
              <li>
                <NavLink to={"dashboard"}>Dashboard</NavLink>
              </li>
            </NavList>
          )}
        </HeaderWrapper>
      </Container>
    </PageHeader>
  );
};

export default Header;
