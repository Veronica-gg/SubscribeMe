import { SafeAreaView } from "react-native-safe-area-context";
import SubmitButton from "../../../components/SubmitButton";
import { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Alert, Keyboard } from "react-native";
import { auth, functions } from "../../../utils/firebase";
import { httpsCallable } from "firebase/functions";
import { List, Surface, Text, useTheme, HelperText } from "react-native-paper";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import PaperTextInput from "../../../components/StyledTextInput";
import { LinearGradient } from "expo-linear-gradient";
import PasswordStrengthBar from "../../../components/PasswordStrengthBar";
import {
  maxLength,
  minLength,
  validateEmail,
  validateName,
} from "../../../utils/utils";
import { updateState } from "../../../redux/stateUpdater";
import { useDispatch, useSelector } from "react-redux";
import { reset, updateProfile } from "../../../redux/reducer";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import LoadingIndicator from "../../../components/LoadingIndicator";

export default function ProfileScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const myEmail = useSelector((state) => state.data.email);

  function logout() {
    auth
      .signOut()
      .then(() => {
        dispatch(reset());
      })
      .catch(() => {});
  }

  const [disablePage, setDisablePage] = useState(false);

  function addFriend(friendEmail) {
    setDisablePage(true);
    const fun = httpsCallable(functions, "manageUser-addFriendRequest");
    fun({ email: friendEmail })
      .then((v) => {
        setDisablePage(false);
        if (v.data.message === "ok") {
          Alert.alert(
            "Request sent",
            "You have successfully sent a request to add a friend.",
            [{ text: "OK", onPress: () => {} }]
          );
          setFriendEmail("");
        } else if (
          v.data.message === "errorNotExists" ||
          v.data.message === "errorNoOwnFriend" ||
          v.data.message === "errorAlreadyFriend"
        ) {
          Alert.alert("Error", "Cannot add this user as a friend.", [
            { text: "OK", onPress: () => {} },
          ]);
        } else {
          Alert.alert("Error", "A network error occurred :( Please try again", [
            {
              text: "OK",
              onPress: () => {},
              style: "cancel",
            },
          ]);
        }
      })
      .catch(() => {
        setDisablePage(false);
        Alert.alert("Error", "An error occurred :( Please try again", [
          {
            text: "OK",
            onPress: () => {},
            style: "cancel",
          },
        ]);
      });
  }

  function setRemoteName(userName) {
    setDisablePage(true);
    const fun = httpsCallable(functions, "manageUser-setName");
    fun({ name: userName })
      .then((v) => {
        setDisablePage(false);
        if (v.data.message === "ok") {
          dispatch(
            updateProfile({ name: v.data.user.name, email: v.data.user.email })
          );
          Alert.alert(
            "Name correctly saved",
            "You have successfully updated your name.",
            [{ text: "OK", onPress: () => {} }]
          );
          setNewName("");
        } else {
          Alert.alert("Error", "A network error occurred :( Please try again", [
            { text: "OK", onPress: () => {} },
          ]);
        }
      })
      .catch(() => {
        setDisablePage(false);
        Alert.alert("Error", "A network error occurred :( Please try again", [
          { text: "OK", onPress: () => {} },
        ]);
      });
  }

  function changeEmailOrPassword(currentPassword, updatedField, isPassword) {
    setDisablePage(true);
    reauthenticateWithCredential(
      auth.currentUser,
      EmailAuthProvider.credential(auth.currentUser.email, currentPassword)
    )
      .then((res) => {
        setDisablePage(false);
        if (isPassword) {
          updatePassword(res.user, updatedField)
            .then(() => {
              Alert.alert(
                "Password updated",
                "You have successfully updated your password.",
                [{ text: "OK", onPress: () => {} }]
              );
              setOldPwd("");
              setNewPwd("");
              setShowPasswordStrength(false);
            })
            .catch(() => {
              Alert.alert("Error", "Could not update password. Try again.", [
                { text: "OK", onPress: () => {} },
              ]);
            });
        } else {
          updateEmail(res.user, updatedField)
            .then(() => {
              dispatch(
                updateProfile({
                  email: updatedField,
                })
              );
              Alert.alert(
                "E-mail updated",
                "You have successfully updated your e-mail.",
                [{ text: "OK", onPress: () => {} }]
              );
              setPwd("");
              setNewEmail("");
            })
            .catch(() => {
              Alert.alert("Error", "Could not update e-mail. Try again.", [
                { text: "OK", onPress: () => {} },
              ]);
            });
        }
      })
      .catch(() => {
        setDisablePage(false);
        Alert.alert("Error", "Wrong password!", [
          { text: "OK", onPress: () => {} },
        ]);
      });
  }

  useEffect(() => {
    if (!isFocused) return;
    updateState(dispatch, false, true, true);
  }, [isFocused]);

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
  return (
    <SafeAreaView
      edges={["left", "right", "top"]}
      style={{
        flex: 1,
        justifyContent: "top",
        alignItems: "center",
      }}
      pointerEvents={disablePage ? "none" : "auto"}
    >
      <View
        style={{
          textAlign: "left",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Text style={styles.mainTitle}>Profile</Text>
      </View>
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
                <Text style={styles.title}>Insert Friend's E-mail</Text>
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
                    addFriend(friendEmail);
                    Keyboard.dismiss();
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
                      setIsNameWrong(!validateName(text));
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
                    setRemoteName(newName);
                    setNewName("");
                    Keyboard.dismiss();
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
                    value={myEmail}
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
                    changeEmailOrPassword(pwd, newEmail, false);
                    setNewEmail("");
                    setPwd("");
                    Keyboard.dismiss();
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
                    changeEmailOrPassword(oldPwd, newPwd, true);
                    setOldPwd("");
                    setNewPwd("");
                    Keyboard.dismiss();
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
      {disablePage && (
        <LoadingIndicator
          size="large"
          style={{ position: "absolute", bottom: "50%" }}
        />
      )}
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
  mainTitle: {
    textAlign: "left",
    fontSize: 30,
    margin: 20,
    marginBottom: 0,
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
