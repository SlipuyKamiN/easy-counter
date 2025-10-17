import { NumberInput } from "./DashboardPage.styled";

export const QtyInput = ({
  item,
  found,
  handleChange,
  itemKey,
  defaultValue,
  column,
}) => {
  return (
    <NumberInput
      type="number"
      min={0}
      maxLength={3}
      defaultValue={defaultValue}
      onBlur={({ target }) => {
        const value = Number(target.value);
        if (defaultValue === value || value < 0) return;
        handleChange(item.id, {
          ...item,
          [itemKey]: item[itemKey].map((l) => {
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

export const EmptyQtyInput = ({ setNewRow, value, column, itemKey, name }) => {
  return (
    <NumberInput
      required
      type="number"
      min={0}
      maxLength={3}
      value={value}
      onChange={({ target }) => {
        const value = Number(target.value);

        setNewRow((prev) => ({
          ...prev,
          [itemKey]: prev[itemKey].map((l) => {
            if (l.name === name) {
              return { ...l, [column]: value };
            }
            return l;
          }),
        }));
      }}
    />
  );
};
