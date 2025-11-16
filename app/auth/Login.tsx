import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useAuth } from "../../src/context/AuthContext";
import { router } from "expo-router";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Please enter both email and password.");
      return;
    }
    await login(email, password);
    router.replace("/home");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Welcome 👋</Text>
          <Text style={styles.subtitle}>
            Log in to manage your subscriptions
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#4d5cab"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#4d5cab"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={{ alignItems: "center" }}>
            <Pressable
              onPress={handleLogin}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
          </View>

          <Pressable onPress={() => router.push("/auth/register")}>
            <Text style={styles.link}>
              Don’t have an account?{" "}
              <Text style={styles.linkBold}>Register</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#c2c7ec",
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#1b247a",
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#1f2c9c",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f0f4ff",
    borderColor: "#2533a8",
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    color: "#000",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  button: {
    backgroundColor: "#ffffff",
    borderColor: "#2c3ab0",
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    width: 200,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: 16,
  },
  buttonPressed: {
    backgroundColor: "#e4e7fc",
  },
  buttonText: {
    color: "#2533a8",
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    marginTop: 27,
    textAlign: "center",
    color: "#1f2c9c",
    fontWeight: "500",
  },
  linkBold: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1f2c9c",
  },
});