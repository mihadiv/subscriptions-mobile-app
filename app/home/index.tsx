import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../src/context/AuthContext";

export default function HomeScreen() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={logout}
        style={({ pressed }) => [
          styles.logoutButton,
          pressed && styles.logoutButtonPressed,
        ]}
      >
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </Pressable>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeLine1}>Welcome, user! 👋</Text>
        <Text style={styles.welcomeLine2}>
          Ready to track your subscriptions?
        </Text>
      </View>

      <View style={styles.centeredContent}>
        <Image
          source={require("../../assets/animations/waving-bear.gif")}
          style={styles.gif}
        />

        <View style={styles.viewSubscriptionsButton}>
          <Pressable
            onPress={() => router.push("/subscriptions")}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>View My Subscriptions</Text>
          </Pressable>
        </View>

        <View style={styles.addSubscriptionButton}>
          <Pressable
            onPress={() => router.push("/subscriptions/add")}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Add Subscription</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: "#c2c7ec",
  },
  welcomeContainer: {
    alignSelf: "flex-start",
    marginTop: 110,
    marginBottom: 16,
  },
  welcomeLine1: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1b247a",
  },
  welcomeLine2: {
    fontSize: 16,
    color: "#1f2c9c",
    marginTop: 4,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: -40,
  },
  gif: {
    width: 150,
    height: 150,
  },
  button: {
    backgroundColor: "#ffffff",
    borderColor: "#2c3ab0",
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    width: "100%",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonPressed: {
    backgroundColor: "#e4e7fc",
  },
  buttonText: {
    color: "#2533a8",
    fontSize: 16,
    fontWeight: "600",
  },
  viewSubscriptionsButton: {
    marginVertical: 8,
    width: "80%",
    marginTop: 60,
  },
  addSubscriptionButton: {
    marginVertical: 8,
    width: "80%",
    marginTop: 10,
  },
  logoutButton: {
    position: "absolute",
    top: 60,
    right: 24,
    backgroundColor: "#fff",
    borderColor: "#aa1d1d",
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    zIndex: 10,
  },
  logoutButtonPressed: {
    backgroundColor: "#f8d7da",
  },
  logoutButtonText: {
    color: "#aa1d1d",
    fontSize: 14,
    fontWeight: "600",
  },
});