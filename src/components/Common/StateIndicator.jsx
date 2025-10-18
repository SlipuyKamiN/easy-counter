import { ImSpinner3 } from "react-icons/im";
import { BiError } from "react-icons/bi";
import { BsCloudCheck } from "react-icons/bs";
import { StateWrapper } from "./StateIndicator.styled";

export const StateIndicator = ({
  isLoading,
  isError,
  success = false,
  size = 30,
  text = "",
}) => {
  return (
    <StateWrapper>
      <span>{text}</span>
      {isLoading && <ImSpinner3 size={size} className="spinner" />}
      {isError && <BiError size={size} />}
      {success && !isLoading && !isError && (
        <BsCloudCheck size={size} className="hidden" />
      )}
    </StateWrapper>
  );
};
