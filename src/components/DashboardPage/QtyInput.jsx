import { NumberInput } from "./DashboardPage.styled";

export const QtyInput = ({ item, found, handleChange, key, column }) => {
  return (
    <NumberInput
      type="number"
      min={0}
      maxLength={3}
      defaultValue={found[column]}
      onBlur={({ target }) => {
        const value = Number(target.value);
        if (found[column] === value || value < 0) return;
        handleChange(item.id, {
          ...item,
          [key]: item[key].map((l) => {
            if (l.name === found.name) {
              l[column] = value;
            }

            return l;
          }),
        });
      }}
    />
  );
};
