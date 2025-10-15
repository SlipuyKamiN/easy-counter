import { Link, NavLink } from "react-router-dom";

const Header = () => (
  <header>
    <Link to={"/"}>easyCounter</Link>
    <ul>
      <li>
        <NavLink to={"/data"}>Data</NavLink>
      </li>
      <li>
        <NavLink to={"/counterList"}>Counter</NavLink>
      </li>
    </ul>
  </header>
);

export default Header;
