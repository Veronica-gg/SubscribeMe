import * as React from "react";
import { Switch } from "react-native-paper";

const SwitchOnOff = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color="#CA4D57" />
  );
};

export default SwitchOnOff;
