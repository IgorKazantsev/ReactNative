import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { saveResult } from "../database/database";

export default function ResultScreen() {
  const { score, total, percentage, duration } = useLocalSearchParams();

  const [username, setUsername] = useState("");

  function handleSave() {
    saveResult(
      username || "Anonymous",
      Number(score),
      Number(percentage),
      Number(total),
      Number(duration),
    );

    router.replace("/leaderboard");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Finished 🎉</Text>

      <Text style={styles.result}>
        Score: {score} / {total}
      </Text>

      <Text style={styles.result}>Percentage: {percentage}%</Text>

      <Text style={styles.result}>Duration: {duration}s</Text>

      <TextInput
        placeholder="Enter your name"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Result</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.buttonText}>Play Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
  },
  result: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    marginBottom: 16,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  secondaryButton: {
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});
