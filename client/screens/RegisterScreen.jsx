import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import { useState } from "react";

export default function RegisterScreen({ navigation }) {
  const [isFirstTimer, setIsFirstTimer] = useState(true);
  const [pin, setPin] = useState("");

  return (
    <View style={styles.container}>
      {isFirstTimer ? (
        <>
          <Text>RegisterScreen</Text>
          <TextInput placeholder="First Name" style={styles.input} />
          <TextInput placeholder="Last Name" style={styles.input} />
          <TextInput placeholder="Mobile no." style={styles.input} />
          <TextInput placeholder="Email" style={styles.input} />
          <TextInput placeholder="Address" style={styles.input} />
          <TextInput placeholder="City" style={styles.input} />
          <Button
            title="Register"
            onPress={() => {
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
            value={pin}
            onChangeText={(text) => {
              setPin(text);
            }}
          />
          <Button
            title="Verify"
            onPress={() => {
              if (pin.length !== 4) {
                console.log("Invalid Pin");
                return;
              }
              navigation.replace("Dashboard");
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
