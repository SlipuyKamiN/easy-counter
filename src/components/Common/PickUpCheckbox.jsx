import { useState } from "react";
import { Checkbox, CheckboxWrapper, RiderSwitch } from "./Inputs.styled";
import { FaCheck } from "react-icons/fa";

export const PickUpCheckbox = ({ item, onChange }) => {
  const [isChecked, setIsChecked] = useState(item.pickupNeeded);

  const handleChange = () => {
    const next = !isChecked;
    setIsChecked(next);
    onChange(next);
  };

  return (
    <RiderSwitch>
      <Checkbox
        name="pick-up"
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
    </RiderSwitch>
  );
};

export const EssentialsCheckbox = ({ item, found, onChange }) => {
  const [isChecked, setIsChecked] = useState(found.available);

  const handleChange = () => {
    const next = !found.available;
    setIsChecked(next);
    onChange(item.id, {
      ...item,
      essentials: item.essentials.map((a) => {
        if (a.name === found.name) {
          a.available = next;
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
        checked={isChecked}
        onChange={handleChange}
      />
      <span>
        <FaCheck size={28} />
      </span>
    </CheckboxWrapper>
  );
};
