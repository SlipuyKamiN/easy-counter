import { useEffect, useState } from "react";
import {
  Checkbox,
  CheckboxWrapper,
  TourerSwitchWrapper,
} from "./Inputs.styled";
import { FaCheck } from "react-icons/fa";

export const TourerSwitcher = ({ item, onChange }) => {
  const [isChecked, setIsChecked] = useState(item.pickupNeeded);

  const handleChange = () => {
    const next = !isChecked;
    setIsChecked(next);
    onChange(next);
  };

  return (
    <TourerSwitchWrapper>
      <Checkbox
        name="pick-up"
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
    </TourerSwitchWrapper>
  );
};

export const EssentialsCheckbox = ({ item, found, onChange }) => {
  const [isChecked, setIsChecked] = useState(found.available);

  useEffect(() => setIsChecked(found.available), [found.available]);

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
