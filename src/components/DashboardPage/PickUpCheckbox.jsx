export const PickUpCheckbox = ({ handleChange, item }) => {
  return (
    <input
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
