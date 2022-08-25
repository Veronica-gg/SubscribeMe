// import { DatePicker } from "react-native-wheel-pick";

// function DatePick() {
//   return (
//     <DatePicker
//       style={{ backgroundColor: "#FFF9F3", width: "65%", height: 150 }}
//       minimumDate={new Date("2000-01-01")}
//       maximumDate={new Date("2030-12-31")}
//       onDateChange={(date) => {
//         console.log(date);
//       }}
//     />
//   );
// }
// export default DatePick;

import React from "react";
import { Text } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";

import { en, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", en);

export default function DatePick() {
  const [inputDate, setInputDate] = React.useState(undefined);

  return (
    <>
      <DatePickerInput
        locale="en"
        label="Subscribed on"
        value={inputDate}
        onChange={(d) => setInputDate(d)}
        inputMode="start"
        mode="outlined"
        style={{
          width: "100%",
          height: 60,
        }}
      />
    </>
  );
}
