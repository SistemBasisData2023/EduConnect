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
    currentDate.setHours(0, 0, 0, 0); // Set time to 12:00 AM

    const formattedDateTime = currentDate.toISOString();

    console.log(formattedDateTime);
    setDeadline(formattedDateTime);
    //Placeholder untuk date
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
