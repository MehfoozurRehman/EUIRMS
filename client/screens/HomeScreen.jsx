import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Welcome to EUIRMS
      </Text>
      <Button
        title="Register"
        onPress={() => {
          navigation.replace("Register");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
