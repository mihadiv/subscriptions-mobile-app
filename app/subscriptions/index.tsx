import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Pressable,
  Platform,
  Image,
} from "react-native";

export default function Subscriptions() {
  type Subscription = {
    id: string;
    name: string;
    price: string;
    expiry: string;
  };

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    const dummyData = [
      {
        id: "1",
        name: "Netflix",
        price: "12.99",
        expiry: "29-08-2025",
      },
      {
        id: "2",
        name: "Spotify",
        price: "6.99",
        expiry: "15-09-2025",
      }
    ];
    setSubscriptions(dummyData);
  }, []);

  const renderItem = ({ item }: { item: Subscription }) => (
    <View style={styles.subscriptionItem}>
      <Text style={styles.name}>- {item.name} -</Text>
      <Text style={styles.details}>Price: ${item.price}</Text>
      <Text style={styles.details}>Expires: {item.expiry}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() => router.back()}
        style={({ pressed }) => [
          styles.backButton,
          styles.backButtonAbsolute,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}> ← Back </Text>
      </Pressable>

      <View style={styles.titleRow}>
        <Image
          source={require("../../assets/images/document.png")}
          style={styles.titleIcon}
          resizeMode="contain"
        />
        <Text style={styles.title}>My Subscriptions</Text>
      </View>

      <FlatList
        data={subscriptions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c2c7ec",
    paddingTop: 80,
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 24,
    color: "#1b247a",
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 40,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 5,
    marginTop: 24,
    marginLeft: 25,
  },

  titleIcon: {
    width: 28,
    height: 28,
    marginRight: 8,
    marginTop: 38,
  },

  subscriptionItem: {
    backgroundColor: "#fff",
    borderColor: "#2c3ab0",
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },

  name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2533a8",
    marginBottom: 10,
  },

  details: {
    fontSize: 14,
    color: "#1f2c9c",
  },

  buttonPressed: {
    backgroundColor: "#e4e7fc",
  },

  buttonText: {
    color: "#2533a8",
    fontSize: 16,
    fontWeight: "600",
  },

  backButton: {
    backgroundColor: "#ffffff",
    borderColor: "#2c3ab0",
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
    marginBottom: 16,
  },

  backButtonAbsolute: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    left: 24,
    zIndex: 10,
  },
});