import { SafeAreaView } from "react-native-safe-area-context";
import SubmitButton from "../../../components/SubmitButton";
import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { auth, functions } from "../../../utils/firebase";
import { httpsCallable } from "firebase/functions";
import { List, Surface, Text, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import PaperTextInput from "../../../components/StyledTextInput";
import { LinearGradient } from "expo-linear-gradient";

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

  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [friendEmail, setFriendEmail] = useState("");

  function addFriend() {
    const fun = httpsCallable(functions, "manageUser-addFriend");
    fun({ email: newEmail })
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
        //backgroundColor: "#FFF9F3",
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
        <Surface style={styles.surf}>
          <Text style={[styles.title, { marginBottom: 10 }]}>
            Manage Friends
          </Text>

          <List.Section
            style={{
              width: "100%",
              backgroundColor: "#FFE4CA",
              borderRadius: 0,
            }}
            titleStyle={{ backgroundColor: "#FFE4CA", borderRadius: 0 }}
          >
            <List.Accordion
              title="Add a friend"
              style={styles.accordion}
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
                  },
                ]}
              >
                <Text style={styles.title}>Insert Friend's e-mail</Text>
                <View style={styles.inputView}>
                  <PaperTextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="email"
                    keyboardType="email-address"
                    originalPlaceholder="Your friend's e-mail"
                    value={friendEmail}
                    onChangeText={(text) => setFriendEmail(text)}
                  />
                </View>
                <SubmitButton
                  onPressID={() => {
                    addFriend();
                  }}
                  textID="ADD FRIEND"
                  iconID="account-multiple-plus"
                  style={{ justifyContent: "top", marginTop: 0 }}
                />
              </Surface>
            </List.Accordion>
          </List.Section>
          <List.Item
            title="List of Friends"
            style={styles.container}
            left={(p) => <List.Icon {...p} icon="format-list-bulleted" />}
            onPress={() => {
              navigation.navigate("FriendsList");
            }}
          />
        </Surface>
        <Surface style={{ ...styles.surf, marginBottom: logoutHeight * 1.2 }}>
          <Text style={[styles.title, { marginBottom: 10 }]}>
            Profile Settings
          </Text>
          <List.Section
            style={{
              width: "100%",
              backgroundColor: "#FFE4CA",
              borderRadius: 0,
            }}
            titleStyle={{ backgroundColor: "#FFE4CA", borderRadius: 0 }}
          >
            <List.Accordion
              title="Name"
              description="Change and update name"
              style={styles.accordion}
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
                  },
                ]}
              >
                <Text style={styles.title}>Insert updated name</Text>
                <View style={styles.inputView}>
                  <PaperTextInput
                    // autoCapitalize="none"
                    autoCorrect={false}
                    originalPlaceholder="Updated Name"
                    // backgroundColor="transparent"
                    value={newName}
                    onChangeText={(text) => setNewName(text)}
                  />
                </View>
                <SubmitButton
                  onPressID={() => {
                    // addFriend();
                  }}
                  textID="SAVE NEW NAME"
                  iconID="account-check"
                  style={{ justifyContent: "top", marginTop: 0 }}
                />
              </Surface>
            </List.Accordion>
          </List.Section>
          <List.Section
            style={{
              width: "100%",
              backgroundColor: "#FFE4CA",
              borderRadius: 0,
            }}
            titleStyle={{ backgroundColor: "#FFE4CA", borderRadius: 0 }}
          >
            <List.Accordion
              title="E-mail"
              description="Change and update e-mail"
              style={styles.accordion}
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
                  },
                ]}
              >
                <Text style={styles.title}>Insert updated e-mail</Text>
                <View style={styles.inputView}>
                  <PaperTextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="email"
                    keyboardType="email-address"
                    originalPlaceholder="Updated E-mail"
                    // backgroundColor="transparent"
                    value={newEmail}
                    onChangeText={(text) => setNewEmail(text)}
                  />
                </View>
                <SubmitButton
                  onPressID={() => {
                    // addFriend();
                  }}
                  textID="SAVE NEW E-MAIL"
                  iconID="email-check"
                  style={{ justifyContent: "top", marginTop: 0 }}
                />
              </Surface>
            </List.Accordion>
          </List.Section>
          <List.Section
            style={{
              width: "100%",
              backgroundColor: "#FFE4CA",
              borderRadius: 0,
            }}
            titleStyle={{ backgroundColor: "#FFE4CA", borderRadius: 0 }}
          >
            <List.Accordion
              title="Password"
              description="Change and update password"
              style={styles.accordion}
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
                  },
                ]}
              >
                <Text style={styles.title}>Insert updated password</Text>
                <View style={styles.inputView}>
                  <PaperTextInput
                    // autoCapitalize="none"
                    autoCorrect={false}
                    originalPlaceholder="Updated Password"
                    // backgroundColor="transparent"
                    value={newPwd}
                    onChangeText={(text) => setNewPwd(text)}
                  />
                </View>
                <SubmitButton
                  onPressID={() => {
                    // addFriend();
                  }}
                  textID="SAVE NEW PWD"
                  iconID="lock-check"
                  style={{ justifyContent: "top", marginTop: 0 }}
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
            backgroundColor: "#CA4D57",
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
    backgroundColor: "#FFE4CA",
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
    backgroundColor: "#FFE4CA",
  },
});
