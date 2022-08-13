import { View, StyleSheet } from "react-native";
import { ProgressBar, Text } from "react-native-paper";
import { useTheme } from "react-native-paper";
import zxcvbn from "zxcvbn";

const minLength = 6;
const disabledColor = "#CCCCCC";

function PasswordScore(password) {
  return password.length >= minLength ? zxcvbn(password).score : -1;
}

function StrengthColor(strength, bar) {
  // if (strength < bar) {
  //   return disabledColor;
  // }
  switch (strength) {
    case 0:
      return "#B22222";
    case 1:
      return "#FF0000";
    case 2:
      return "#FFA500";
    case 3:
      return "#32CD32";
    case 4:
      return "#008000";
    default:
      return disabledColor;
  }
}

function Message(strength) {
  switch (strength) {
    case -1:
      return "Too short! At least 6 characters";
    case 0:
      return "Very weak password";
    case 1:
      return "Weak password";
    case 2:
      return "Medium password";
    case 3:
      return "Strong password";
    case 4:
      return "Very strong password";
  }
}

export default function PasswordStrengthBar({ password }) {
  const score = PasswordScore(password);
  const message = Message(score);
  const { colors } = useTheme();
  return (
    <View style={styles.root}>
      <View
        style={[
          styles.containerLine,
          { display: password.length > 0 ? "flex" : "none" },
        ]}
      >
        <View style={styles.bar}>
          <ProgressBar
            progress={score > -1 ? 1 : 0}
            color={StrengthColor(score, 0)}
            style={styles.barElement}
          />
        </View>
        <View style={styles.bar}>
          <ProgressBar
            progress={score > 0 ? 1 : 0}
            color={StrengthColor(score, 1)}
            style={styles.barElement}
          />
        </View>
        <View style={styles.bar}>
          <ProgressBar
            progress={score > 1 ? 1 : 0}
            color={StrengthColor(score, 2)}
            style={styles.barElement}
          />
        </View>
        <View style={styles.bar}>
          <ProgressBar
            progress={score > 2 ? 1 : 0}
            color={StrengthColor(score, 3)}
            style={styles.barElement}
          />
        </View>
        <View style={styles.bar}>
          <ProgressBar
            progress={score > 3 ? 1 : 0}
            color={StrengthColor(score, 4)}
            style={styles.barElement}
          />
        </View>
      </View>
      <View
        style={[
          styles.containerText,
          { display: password.length > 0 ? "flex" : "none" },
        ]}
      >
        <Text display={"displaySmall"} style={{ color: colors.secondary }}>
          {message}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
  },
  containerLine: {
    flex: 1,
    flexDirection: "row",
  },
  containerText: {
    flex: 1,
    flexDirection: "col",
    alignItems: "center",
    justifyContent: "center",
  },
  bar: {
    margin: "1%",
    flex: 1,
  },
  barElement: {
    height: 8,
    borderRadius: 20,
  },
});
