import { View, Text, StyleSheet, Image } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lecodearn</Text>
      <Image
        source={require("../assets/splash-art.png")}
        style={styles.image}
      />
      <Text style={styles.subtitle}>Just code</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4FE",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#3F3D56",
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  subtitle: {
    fontSize: 18,
    color: "#6B6B6B",
    marginTop: 20,
    textAlign: "center",
  },
});
