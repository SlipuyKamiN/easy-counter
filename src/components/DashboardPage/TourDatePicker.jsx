import { useState } from "react";
import DatePicker from "react-multi-date-picker";

export const TourDatePicker = ({ item, handleChange }) => {
  const [dates, setDates] = useState(item.nextCheckout);

  //   useEffect(() => {
  //     handleChange(item.id, {
  //       ...item,
  //       nextCheckout: dates,
  //     });
  //   }, [item, dates, handleChange]);

  return (
    <DatePicker
      name="date"
      placeholder=" - "
      inputClass="date-picker"
      format="DD.MM.YY"
      multiple
      minDate={new Date().setHours(0, 0, 0, 0)}
      value={dates}
      onChange={setDates}
      onClose={() =>
        handleChange(item.id, {
          ...item,
          nextCheckout: dates,
        })
      }
      sort
    />
  );
};
