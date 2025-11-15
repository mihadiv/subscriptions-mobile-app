import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { useAuth } from "../../src/context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Please fill in all fields.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert("Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match.");
      return;
    }

    Alert.alert("Registered successfully!");
    register(name, email, password);
    router.push("/auth/login");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Create Account</Text>

          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#4d5cab"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#4d5cab"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#4d5cab"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#4d5cab"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <Pressable
            onPress={handleRegister}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>

          <Pressable onPress={() => router.push("/auth/login")}>
            <Text style={styles.link}>
              Already have an account?{" "}
              <Text style={styles.linkBold}>Log in</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#c2c7ec",
    flexGrow: 1,
  },

  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
    color: "#1b247a",
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#f0f4ff",
    borderColor: "#2533a8",
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    fontSize: 16,
    color: "#000",
  },

  button: {
    backgroundColor: "#ffffff",
    borderColor: "#2c3ab0",
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
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