import * as React from "react";
import { ActivityIndicator } from "react-native-paper";

const LoadingIndicator = (props) => (
  <ActivityIndicator {...props} animating={true} color={"#FF9428"} />
);

export default LoadingIndicator;
