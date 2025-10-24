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

export const EssentialsCheckbox = ({ item, found, onChange }) => {
  const handleChange = () => {
    onChange(item.id, {
      ...item,
      essentials: item.essentials.map((a) => {
        if (a.name === found.name) {
          a.available = !found.available;
        }
        return a;
      }),
      updatedAt: new Date(),
    });
  };

  return (
    <CheckboxWrapper>
      <Checkbox
        name={found.name}
        type="checkbox"
        checked={found.available}
        onChange={handleChange}
      />
      <span>
        <FaCheck size={28} />
      </span>
    </CheckboxWrapper>
  );
};
