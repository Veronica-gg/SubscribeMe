import { Picker } from "react-native-wheel-pick";

function NumberPicker(props) {
  return (
    <Picker
      style={{ backgroundColor: "#FFF9F3", width: "30%", height: 215 }}
      selectedValue={props.default}
      pickerData={props.pickerData}
      onValueChange={(value) => {
        console.log(value);
      }}
    />
  );
}

export default NumberPicker;
