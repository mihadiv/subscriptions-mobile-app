import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Platform,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function AddSubscription() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [startDate, setStartDate] = useState(new Date());
  const [duration, setDuration] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  useEffect(() => {
    if (startDate && duration) {
      try {
        const start = new Date(startDate);
        const months = parseInt(duration);
        if (!isNaN(start.getTime()) && !isNaN(months)) {
          const expire = new Date(start);
          expire.setMonth(expire.getMonth() + months);
          const day = String(expire.getDate()).padStart(2, "0");
          const month = String(expire.getMonth() + 1).padStart(2, "0");
          const year = expire.getFullYear();
          const formatted = `${day}-${month}-${year}`;
          setExpiryDate(formatted);
        } else {
          setExpiryDate("");
        }
      } catch {
        setExpiryDate("");
      }
    } else {
      setExpiryDate("");
    }
  }, [startDate, duration]);

  const handleSave = () => {
    if (!name || !price || !startDate || !duration) {
      Alert.alert("Please fill in all fields!");
      return;
    }

    Alert.alert(
      "Subscription added!",
      `Name: ${name}
        Price: ${price}
        Starts: ${String(startDate.getDate()).padStart(2, "0")}-${String(
        startDate.getMonth() + 1
      ).padStart(2, "0")}-${startDate.getFullYear()}
        Duration: ${duration} month(s)
        Expires: ${expiryDate}`
    );

    setName("");
    setPrice("");
    setStartDate(new Date());
    setDuration("");
    setExpiryDate("");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Add a New Subscription</Text>

          <TextInput
            style={styles.input}
            placeholder="Subscription name"
            placeholderTextColor="#4d5cab"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Price (e.g. 9.99)"
            placeholderTextColor="#4d5cab"
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
          />

          <Text style={styles.label}>Payment start date</Text>

          <Pressable
            onPress={() => setShowDatePicker(true)}
            style={styles.input}
          >
            <Text style={{ color: "#000" }}>
              {startDate
                ? `${String(startDate.getDate()).padStart(2, "0")}-${String(
                    startDate.getMonth() + 1
                  ).padStart(2, "0")}-${startDate.getFullYear()}`
                : "Select payment date"}
            </Text>
          </Pressable>

          {showDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Duration (months)"
            placeholderTextColor="#4d5cab"
            value={duration}
            onChangeText={setDuration}
            keyboardType="number-pad"
          />

          {expiryDate ? (
            <Text style={styles.expiryText}>Expires on: {expiryDate}</Text>
          ) : null}

          <View style={{ alignItems: "center" }}>
            <Pressable
              onPress={handleSave}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "flex-start",
    backgroundColor: "#c2c7ec",
    paddingTop: 170,
  },

  title: {
    fontSize: 22,
    marginBottom: 16,
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
    color: "#000",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },

  expiryText: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: "center",
    color: "#2533a8",
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

  label: {
    fontSize: 14,
    color: "#1f2c9c",
    marginBottom: 4,
    marginLeft: 4,
    fontWeight: "500",
  },
});
