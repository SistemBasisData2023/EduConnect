import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const PickDate = () => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return (
    <Datepicker
      useRange={false}
      asSingle={true}
      minDate={new Date()}
      value={value}
      onChange={handleValueChange}
    />
  );
};

export default PickDate;
