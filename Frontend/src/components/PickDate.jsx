import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const PickDate = ({ setDeadline }) => {
  //Callendar
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    const dateInput = newValue.startDate;
    const currentDate = new Date(dateInput);
    currentDate.setHours(0, 0, 0, 0); // Set time to 00:00 (midnight)

    const formattedDateTime =
      currentDate.toISOString().split("T")[0] + "T00:00:00.000Z";

    console.log(formattedDateTime);
    setDeadline(formattedDateTime);
    setValue(newValue);
  };

  return (
    <Datepicker
      useRange={false}
      asSingle={true}
      minDate={new Date()}
      value={value}
      onChange={handleValueChange}
      inputClassName="text-sm text-black p-2"
    />
  );
};

export default PickDate;
