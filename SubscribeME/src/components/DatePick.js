import { DatePickerInput } from "react-native-paper-dates";

import { en, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", en);

export default function DatePick(props) {
  return (
    <>
      <DatePickerInput
        locale="en"
        label="Subscribed on"
        value={props.inputDate}
        onChange={props.onChange}
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
