import { useRef, useState } from "react";
import DatePicker from "react-multi-date-picker";

export const TourDatePicker = ({ item, handleChange }) => {
  const [dates, setDates] = useState(item.nextTour || []);
  const ref = useRef(item.nextTour || []);

  return (
    <DatePicker
      name="date"
      placeholder=" - "
      inputClass="date-picker"
      format="DD.MM.YY"
      multiple
      minDate={new Date().setHours(0, 0, 0, 0)}
      value={dates}
      onChange={(v) => {
        const arr = Array.isArray(v) ? v : [];
        ref.current = arr;
        setDates(arr);
      }}
      onClose={() =>
        handleChange(item.id, {
          ...item,
          nextTour: Array.isArray(ref.current) ? ref.current : [],
        })
      }
      sort
    />
  );
};
