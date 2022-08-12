import * as React from "react";
import { ActivityIndicator } from "react-native-paper";

const LoadingIndicator = () => (
  <ActivityIndicator animating={true} color={"#FF9428"} />
);

export default LoadingIndicator;
