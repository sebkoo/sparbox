import { Link } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Sparbox</ThemedText>
      <ThemedText type="small">
        Paste a job description to start an interview.
      </ThemedText>
      <Link href={{ pathname: "/session/[id]", params: { id: "demo" } }}>
        <ThemedText type="link">Start a session</ThemedText>
      </Link>
      <Link href={{ pathname: "/review/[id]", params: { id: "demo" } }}>
        <ThemedText type="link">Review a session</ThemedText>
      </Link>
      <Link href="/settings">
        <ThemedText type="link">Settings</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.three,
  },
});
