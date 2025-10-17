import { Checkbox } from "./Inputs.styled";

export const PickUpCheckbox = ({ handleChange, item }) => {
  return (
    <Checkbox
      type="checkbox"
      checked={item.pickupNeeded}
      onChange={() =>
        handleChange(item.id, {
          ...item,
          pickupNeeded: !item.pickupNeeded,
        })
      }
    />
  );
};
