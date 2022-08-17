import { DatePicker } from "react-native-wheel-pick";

function DatePick() {
  return (
    <DatePicker
      style={{ backgroundColor: "#FFF9F3", width: "75%", height: 150 }}
      minimumDate={new Date("2000-01-01")}
      maximumDate={new Date("2030-12-31")}
      onDateChange={(date) => {
        console.log(date);
      }}
    />
  );
}
export default DatePick;
