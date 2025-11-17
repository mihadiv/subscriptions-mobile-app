import React, { useState, useEffect, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Pressable,
  Platform,
  Image,
  Alert,
} from "react-native";
import API_URL from "../../src/config/api";
import axios from "axios";
import { useAuth } from "../../src/context/AuthContext";

type Subscription = {
  id: number;
  name: string;
  price: string;
  expiry_date: string;
};

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const { user } = useAuth();

  const fetchSubscriptions = async () => {
    try {
      const res = await axios.get(`${API_URL}/subscriptions/list/${user.id}`);
      setSubscriptions(res.data);
    } catch (error) {
      console.log("ERR fetching subscriptions:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchSubscriptions();
    }, [])
  );

const handleDelete = (id: number) => {
  Alert.alert(
    "Confirm Delete",
    "Are you sure you want to delete this subscription?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`${API_URL}/subscriptions/delete/${id}`);
            fetchSubscriptions(); 
          } catch (error) {
            console.log(error);
          }
        },
      },
    ]
  );
};

  const renderItem = ({ item }: { item: Subscription }) => (
    <View style={styles.subscriptionItem}>
      <Text style={styles.name}>- {item.name} -</Text>
      <Text style={styles.details}>Price: ${item.price}</Text>
      <Text style={styles.details}>
        Expires:{" "}
        {new Date(item.expiry_date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </Text>
      <Pressable
      onPress={()=> handleDelete(item.id)}
      style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
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
        keyExtractor={(item) => item.id.toString()}
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

  deleteButton: {
  marginTop: 10,
  backgroundColor: "#fbececff",
  borderColor: "#cc0000",
  borderWidth: 2,
  borderRadius: 10,
  paddingVertical: 6,
  paddingHorizontal: 12,
  alignSelf: "flex-end",
},

deleteButtonText: {
  color: "#cc0000",
  fontWeight: "600",
},

});

