import { ImSpinner3 } from "react-icons/im";
import { BiError } from "react-icons/bi";
import { BsCloudCheck } from "react-icons/bs";
import { RedirectWrapper, StateWrapper } from "./StateIndicator.styled";
import { Container, Section } from "../SharedLayout/SharedLayout.styled";
import { AddressInput } from "../DashboardPage/DashboardPage.styled";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CiRoute } from "react-icons/ci";

export const StateIndicator = ({
  isLoading = false,
  isError = false,
  success = false,
  size = 30,
  text = "",
  fixed = false,
}) => {
  return (
    <StateWrapper className={fixed && "fixed"}>
      <span>{text}</span>
      {isLoading && <ImSpinner3 size={size} className="spinner" />}
      {isError && <BiError size={size} />}
      {success && !isLoading && !isError && (
        <BsCloudCheck size={size} className="hidden" />
      )}
    </StateWrapper>
  );
};

export const EmptyPage = () => {
  const [username, setUsername] = useState("");

  return (
    <Section>
      <Container>
        <BiError size={60} />
        <h1>Oops... Something went wrong.</h1>
        <RedirectWrapper>
          <input
            type="text"
            name="username"
            placeholder="Input your username to"
            onChange={({ target }) => setUsername(target.value.toLowerCase())}
          />
          <Link to={`/${username}`}>
            <span>Redirect</span>
            <CiRoute size={25} />
          </Link>
        </RedirectWrapper>
        <p>or</p>
        <p>contact support.</p>
      </Container>
    </Section>
  );
};
