import { Button, StyleSheet, Text, View } from "react-native";

export default function DashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          marginBottom: 20,
          maxWidth: "80%",
          textAlign: "center",
        }}
      >
        Welcome to EUIRMS Dashboard
      </Text>
      <Button
        title="Logout"
        onPress={() => {
          navigation.replace("Home");
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
