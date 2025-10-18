import { Checkbox, CheckboxWrapper } from "./Inputs.styled";
import { FaCheck } from "react-icons/fa";

export const PickUpCheckbox = ({ item, onChange }) => {
  return (
    <CheckboxWrapper>
      <Checkbox
        name="pick-up"
        type="checkbox"
        checked={item.pickupNeeded}
        onChange={onChange}
      />
      <span>
        <FaCheck size={28} />
      </span>
    </CheckboxWrapper>
  );
};
