import { DatePicker } from "react-native-wheel-pick";

function DatePick() {
  return (
    <DatePicker
      style={{ backgroundColor: "#FFF9F3", width: "65%", height: 150 }}
      minimumDate={new Date("2000-01-01")}
      maximumDate={new Date("2030-12-31")}
      onDateChange={(date) => {
        console.log(date);
      }}
    />
  );
}
export default DatePick;

// // import React, { useState } from "react";
// // import { Button } from "react-native";
// // import DatePicker from "react-native-date-picker";

// // export default function DatePick() {
// //   const [date, setDate] = useState(new Date());
// //   const [open, setOpen] = useState(false);

// //   return (
// //     <>
// //       <Button title="Open" onPress={() => setOpen(true)} />
// //       <DatePicker
// //         modal
// //         open={open}
// //         date={date}
// //         onConfirm={(date) => {
// //           setOpen(false);
// //           setDate(date);
// //         }}
// //         onCancel={() => {
// //           setOpen(false);
// //         }}
// //       />
// //     </>
// //   );
// // }
