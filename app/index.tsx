import { Redirect } from "expo-router";
import { useAuth } from "../src/context/AuthContext";

export default function Index() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/auth/login" />;
  }

  return <Redirect href="/home" />;
}