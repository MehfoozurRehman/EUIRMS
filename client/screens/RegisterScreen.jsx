import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import axios from "axios";
import { useState } from "react";

export default function RegisterScreen({ navigation }) {
  const [isFirstTimer, setIsFirstTimer] = useState(true);
  const [pin, setPin] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [userId, setUserId] = useState("");

  const handeSubmit = () => {
    axios
      .post("https://euirms-production.up.railway.app/api/users/register", {
        firstName,
        lastName,
        mobile,
        email,
        address,
        city,
      })
      .then((res) => {
        console.log(res.data);
        setUserId(res.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleVerify = () => {
    axios
      .post("https://euirms-production.up.railway.app/api/users/verify", {
        userId,
        pin,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      {isFirstTimer ? (
        <>
          <Text>RegisterScreen</Text>
          <TextInput
            placeholder="First Name"
            style={styles.input}
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
            }}
          />
          <TextInput
            placeholder="Last Name"
            style={styles.input}
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
            }}
          />
          <TextInput
            placeholder="Mobile no."
            style={styles.input}
            textContentType="telephoneNumber"
            value={mobile}
            keyboardType="phone-pad"
            onChangeText={(text) => {
              setMobile(text);
            }}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            textContentType="emailAddress"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <TextInput
            placeholder="Address"
            style={styles.input}
            value={address}
            onChangeText={(text) => {
              setAddress(text);
            }}
          />
          <TextInput
            placeholder="City"
            style={styles.input}
            value={city}
            onChangeText={(text) => {
              setCity(text);
            }}
          />
          <Button
            title="Register"
            onPress={() => {
              handeSubmit();
              setIsFirstTimer(false);
            }}
          />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Pin"
            secureTextEntry={true}
            style={styles.input}
            maxLength={4}
            keyboardType="numeric"
            onChangeText={(text) => {
              const pinArray = text.split("");
              setPin(pinArray);
            }}
          />
          <Button
            title="Verify"
            onPress={() => {
              if (pin.length !== 4) {
                console.log("Invalid Pin");
                return;
              } else {
                handleVerify();
                navigation.replace("Dashboard");
              }
            }}
          />
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "black",
  },
});
