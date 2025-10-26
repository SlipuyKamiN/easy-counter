import { ImSpinner3 } from "react-icons/im";
import { BiError } from "react-icons/bi";
import { BsCloudCheck } from "react-icons/bs";
import { StateWrapper } from "./StateIndicator.styled";
import { Container, Section } from "../SharedLayout/SharedLayout.styled";

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

export const StateSection = (props) => {
  return (
    <Section>
      <Container>
        <StateIndicator {...props} />
      </Container>
    </Section>
  );
};
