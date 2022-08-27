import { SafeAreaView } from "react-native-safe-area-context";
import SubmitButton from "../../../components/SubmitButton";
import { useState } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import { auth, functions } from "../../../utils/firebase";
import { httpsCallable } from "firebase/functions";
import { List, Surface, Text, useTheme, HelperText } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import PaperTextInput from "../../../components/StyledTextInput";
import { LinearGradient } from "expo-linear-gradient";
import PasswordStrengthBar from "../../../components/PasswordStrengthBar";
import {
  maxLength,
  minLength,
  validateEmail,
  validateName,
} from "../../../utils/utils";

function logout() {
  auth
    .signOut()
    // .then(alert("Signed out!"))
    .catch((error) => alert(error));
}

export default function ProfileScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [logoutHeight, setLogoutHeight] = useState(0);

  const [expandedAdd, setExpandedAdd] = useState(false);
  const handleAddPress = () => setExpandedAdd(!expandedAdd);

  const [expandedName, setExpandedName] = useState(false);
  const handleNamePress = () => setExpandedName(!expandedName);

  const [expandedEmail, setExpandedEmail] = useState(false);
  const handleEmailPress = () => setExpandedEmail(!expandedEmail);

  const [expandedPwd, setExpandedPwd] = useState(false);
  const handlePwdPress = () => setExpandedPwd(!expandedPwd);

  const oldEmail = "PLACEHOLDER";
  const [newEmail, setNewEmail] = useState("");
  const [isEmailWrong, setIsEmailWrong] = useState(false);
  const [isFriendEmailWrong, setIsFriendEmailWrong] = useState(false);
  const [newName, setNewName] = useState("");
  const [isNameWrong, setIsNameWrong] = useState(false);
  const [pwd, setPwd] = useState("");
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [passwordTooShort, setPasswordTooShort] = useState(false);
  const [friendEmail, setFriendEmail] = useState("");
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  function addFriend() {
    const fun = httpsCallable(functions, "manageUser-addFriendRequest");
    fun({ email: friendEmail })
      .then((v) => {
        console.log(v);
      })
      .catch((e) => console.log(e));
  }
  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={{
        flex: 1,
        justifyContent: "top",
        alignItems: "center",
      }}
    >
      <ScrollView
        style={{
          width: "100%",
        }}
        contentContainerStyle={styles.contentContainer}
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="handled"
      >
        <Surface style={[styles.surf, { backgroundColor: colors.profileCard }]}>
          <Text style={[styles.title, { marginBottom: 10 }]}>
            Manage Friends
          </Text>

          <List.Section
            style={{
              width: "100%",
              backgroundColor: colors.profileCard,
              borderRadius: 0,
            }}
            titleStyle={{
              backgroundColor: colors.profileCard,
              borderRadius: 0,
            }}
          >
            <List.Accordion
              title="Add a friend"
              style={[
                styles.accordion,
                { backgroundColor: colors.profileCard },
              ]}
              left={(p) => <List.Icon {...p} icon="account-multiple-plus" />}
              expanded={expandedAdd}
              onPress={handleAddPress}
            >
              <Surface
                style={[
                  styles.surf,
                  {
                    width: "100%",
                    margin: 0,
                    padding: 0,
                    justifyContent: "center",
                    alignItems: "left",
                    backgroundColor: colors.profileCard,
                  },
                ]}
              >
                <Text style={styles.title}>Insert Friend's e-mail</Text>
                <View style={[styles.inputView, { marginBottom: 0 }]}>
                  <PaperTextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="email"
                    keyboardType="email-address"
                    originalPlaceholder="Your friend's E-mail"
                    value={friendEmail}
                    error={isFriendEmailWrong}
                    onChangeText={(text) => {
                      setFriendEmail(text);
                      if (isFriendEmailWrong) {
                        setIsFriendEmailWrong(!validateEmail(text));
                      }
                    }}
                    onBlur={() => {
                      friendEmail.length > 0
                        ? setIsFriendEmailWrong(!validateEmail(friendEmail))
                        : setIsFriendEmailWrong(false);
                    }}
                    theme={{
                      colors: {
                        background: colors.profileCard,
                      },
                    }}
                  />
                </View>
                <HelperText type="error" visible={isFriendEmailWrong}>
                  Wrong e-mail format
                </HelperText>
                <SubmitButton
                  onPressID={() => {
                    addFriend();
                    Alert.alert(
                      "Request sent",
                      "You have successfully sent a request to add a friend.",
                      [{ text: "OK", onPress: () => {} }]
                    );
                  }}
                  textID="ADD FRIEND"
                  iconID="account-multiple-plus"
                  style={styles.submit}
                  disabled={isFriendEmailWrong || friendEmail.length == 0}
                />
              </Surface>
            </List.Accordion>
          </List.Section>
          <List.Item
            title="Pending Requests"
            style={styles.container}
            left={(p) => <List.Icon {...p} icon="account-clock" />}
            onPress={() => {
              navigation.navigate("PendingReq");
            }}
          />
          <List.Item
            title="List of Friends"
            style={styles.container}
            left={(p) => <List.Icon {...p} icon="format-list-bulleted" />}
            onPress={() => {
              navigation.navigate("FriendsList");
            }}
          />
        </Surface>
        <Surface
          style={{
            ...styles.surf,
            backgroundColor: colors.profileCard,
            marginBottom: logoutHeight * 1.2,
          }}
        >
          <Text style={[styles.title, { marginBottom: 10 }]}>
            Profile Settings
          </Text>
          <List.Section
            style={{
              width: "100%",
              backgroundColor: colors.profileCard,
              borderRadius: 0,
            }}
            titleStyle={{
              backgroundColor: colors.profileCard,
              borderRadius: 0,
            }}
          >
            <List.Accordion
              title="Name"
              description="Change and update name"
              style={[
                styles.accordion,
                { backgroundColor: colors.profileCard },
              ]}
              left={(p) => <List.Icon {...p} icon="account-details" />}
              expanded={expandedName}
              onPress={handleNamePress}
            >
              <Surface
                style={[
                  styles.surf,
                  {
                    width: "100%",
                    margin: 0,
                    padding: 0,
                    justifyContent: "center",
                    alignItems: "left",
                    backgroundColor: colors.profileCard,
                  },
                ]}
              >
                <Text style={styles.title}>Insert updated name</Text>
                <View style={[styles.inputView, { marginBottom: 0 }]}>
                  <PaperTextInput
                    originalPlaceholder="Updated Name"
                    value={newName}
                    onChangeText={(text) => {
                      setNewName(text);
                      // if (isNameWrong) {
                      setIsNameWrong(!validateName(text));
                      // }
                    }}
                    error={newName.length > maxLength || isNameWrong}
                    onBlur={() => {
                      newName.length > 0
                        ? setIsNameWrong(!validateName(newName))
                        : setIsNameWrong(false);
                    }}
                    theme={{
                      colors: {
                        background: colors.profileCard,
                      },
                    }}
                  />
                </View>
                <HelperText
                  type="error"
                  visible={newName.length > maxLength || isNameWrong}
                >
                  Name must be {"<"} 10 char and alphanumeric
                </HelperText>
                <SubmitButton
                  onPressID={() => {
                    // addFriend();
                    Alert.alert(
                      "Name correctly saved",
                      "You have successfully updated your name.",
                      [{ text: "OK", onPress: () => {} }]
                    );
                  }}
                  textID="SAVE NEW NAME"
                  iconID="account-check"
                  style={styles.submit}
                  disabled={
                    newName.length == 0 ||
                    newName.length > maxLength ||
                    isNameWrong
                  }
                />
              </Surface>
            </List.Accordion>
          </List.Section>
          <List.Section
            style={{
              width: "100%",
              backgroundColor: colors.profileCard,
              borderRadius: 0,
            }}
            titleStyle={{
              backgroundColor: colors.profileCard,
              borderRadius: 0,
            }}
          >
            <List.Accordion
              title="E-mail"
              description="Change and update e-mail"
              style={[
                styles.accordion,
                { backgroundColor: colors.profileCard },
              ]}
              descriptionStyle={styles.container}
              left={(p) => <List.Icon {...p} icon="email" />}
              expanded={expandedEmail}
              onPress={handleEmailPress}
            >
              <Surface
                style={[
                  styles.surf,
                  {
                    width: "100%",
                    margin: 0,
                    padding: 0,
                    justifyContent: "center",
                    alignItems: "left",
                    backgroundColor: colors.profileCard,
                  },
                ]}
              >
                <Text style={styles.title}>This is your current e-mail</Text>
                <View style={styles.inputView}>
                  <PaperTextInput
                    value={oldEmail}
                    disabled={true}
                    theme={{
                      colors: {
                        background: colors.profileCard,
                      },
                    }}
                  />
                </View>
                <Text style={styles.title}>Insert updated e-mail</Text>
                <View style={[styles.inputView, { marginBottom: 0 }]}>
                  <PaperTextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="email"
                    keyboardType="email-address"
                    originalPlaceholder="Updated E-mail"
                    value={newEmail}
                    error={isEmailWrong}
                    onChangeText={(text) => {
                      setNewEmail(text);
                      if (isEmailWrong) {
                        setIsEmailWrong(!validateEmail(text));
                      }
                    }}
                    onBlur={() => {
                      newEmail.length > 0
                        ? setIsEmailWrong(!validateEmail(newEmail))
                        : setIsEmailWrong(false);
                    }}
                    theme={{
                      colors: {
                        background: colors.profileCard,
                      },
                    }}
                  />
                </View>
                <HelperText type="error" visible={isEmailWrong}>
                  Wrong e-mail format
                </HelperText>
                <Text style={styles.title}>Insert password</Text>
                <View style={styles.inputView}>
                  <PaperTextInput
                    // autoCapitalize="none"
                    autoCorrect={false}
                    originalPlaceholder="Password"
                    // backgroundColor="transparent"
                    value={pwd}
                    isPassword
                    onChangeText={(text) => setPwd(text)}
                    theme={{
                      colors: {
                        background: colors.profileCard,
                      },
                    }}
                  />
                </View>
                <SubmitButton
                  onPressID={() => {
                    // addFriend();
                  }}
                  textID="SAVE NEW E-MAIL"
                  iconID="email-check"
                  style={styles.submit}
                  disabled={
                    isEmailWrong ||
                    newEmail.length == 0 ||
                    pwd.length < minLength
                  }
                />
              </Surface>
            </List.Accordion>
          </List.Section>
          <List.Section
            style={{
              width: "100%",
              backgroundColor: colors.profileCard,
              borderRadius: 0,
            }}
            titleStyle={{
              backgroundColor: colors.profileCard,
              borderRadius: 0,
            }}
          >
            <List.Accordion
              title="Password"
              description="Change and update password"
              style={[
                styles.accordion,
                { backgroundColor: colors.profileCard },
              ]}
              left={(p) => <List.Icon {...p} icon="key-variant" />}
              expanded={expandedPwd}
              onPress={handlePwdPress}
            >
              <Surface
                style={[
                  styles.surf,
                  {
                    width: "100%",
                    margin: 0,
                    padding: 0,
                    justifyContent: "center",
                    alignItems: "left",
                    backgroundColor: colors.profileCard,
                  },
                ]}
              >
                <Text style={styles.title}>Insert old password</Text>
                <View style={styles.inputView}>
                  <PaperTextInput
                    // autoCapitalize="none"
                    autoCorrect={false}
                    originalPlaceholder="Old Password"
                    // backgroundColor="transparent"
                    value={oldPwd}
                    isPassword
                    onChangeText={(text) => setOldPwd(text)}
                    theme={{
                      colors: {
                        background: colors.profileCard,
                      },
                    }}
                  />
                </View>
                <Text style={styles.title}>Insert updated password</Text>
                <View style={styles.inputView}>
                  <PaperTextInput
                    // autoCapitalize="none"
                    autoCorrect={false}
                    originalPlaceholder="Updated Password"
                    // backgroundColor="transparent"
                    value={newPwd}
                    error={passwordTooShort}
                    isPassword
                    onChangeText={(text) => {
                      setNewPwd(text);
                      if (!showPasswordStrength) {
                        setShowPasswordStrength(text.length > 0);
                      }
                      if (passwordTooShort || newPwd.length > text.length) {
                        setPasswordTooShort(
                          text.length < minLength && text.length > 0
                        );
                      }
                    }}
                    onBlur={() => {
                      setPasswordTooShort(
                        newPwd.length < minLength && newPwd.length > 0
                      );
                      setShowPasswordStrength(newPwd.length > 0);
                    }}
                    theme={{
                      colors: {
                        background: colors.profileCard,
                      },
                    }}
                  />
                </View>
                <View
                  style={[
                    showPasswordStrength ? { height: "7%" } : { height: 0 },
                    styles.PasswordStrengthBar,
                  ]}
                >
                  <PasswordStrengthBar
                    password={newPwd}
                    error={passwordTooShort}
                    show={showPasswordStrength}
                  />
                </View>
                <SubmitButton
                  onPressID={() => {
                    // addFriend();
                  }}
                  textID="SAVE NEW PWD"
                  iconID="lock-check"
                  style={styles.submit}
                  disabled={newPwd.length < minLength}
                />
              </Surface>
            </List.Accordion>
          </List.Section>
        </Surface>
      </ScrollView>
      <LinearGradient
        style={{ position: "absolute", bottom: 0, width: "100%", height: 100 }}
        colors={[colors.background + "00", colors.background]}
        pointerEvents={"none"}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
        onLayout={(e) => {
          setLogoutHeight(e.nativeEvent.layout.height);
        }}
      >
        <SubmitButton
          onPressID={logout}
          textID="LOG OUT"
          iconID="logout"
          style={{
            // flex: 1,
            justifyContent: "flex-end",
            backgroundColor: colors.secondary,
            marginTop: 0,
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: "top",
    flexGrow: 1,
    // backgroundColor: "#FFF9F3",
    alignItems: "center",
    justifyContent: "top",
    flexDirection: "column",
  },
  inputView: {
    width: "90%",
    height: 60,
    marginVertical: 20,
    alignItems: "center",
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
  },
  surf: {
    justifyContent: "top",
    width: "95%",
    alignItems: "center",
    // backgroundColor: "#FFE4CA",
    borderRadius: 16,
    marginVertical: 20,
  },
  container: {
    // flex: 1,
    // backgroundColor: "rgba(255, 148, 40, 0.7)",
    width: "100%",
    borderRadius: 16,
  },
  accordion: {
    width: "100%",
  },
  submit: {
    alignItems: "center",
    marginTop: 0,
    width: "90%",
  },

  PasswordStrengthBar: {
    width: "90%",
    marginBottom: 20,
  },
});
