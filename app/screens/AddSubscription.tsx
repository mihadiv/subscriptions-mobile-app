import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AddSubscription() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> This is the Add Subscriptions screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  text: {
    fontSize: 18,
  },
});
