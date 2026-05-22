import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { getLeaderboard } from "../database/database";

export default function LeaderboardScreen() {
  const [results, setResults] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      const data = getLeaderboard();
      setResults(data as any[]);
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard 🏆</Text>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.empty}>No results yet.</Text>}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={styles.rank}>#{index + 1}</Text>
            <Text style={styles.name}>{item.username}</Text>

            <Text>
              Score: {item.score} / {item.totalQuestions}
            </Text>
            <Text>Percentage: {item.percentage}%</Text>
            <Text>Duration: {item.duration}s</Text>
            <Text>{item.createdAt}</Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.buttonText}>Start Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  empty: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 40,
  },
  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
  },
  rank: {
    fontSize: 20,
    fontWeight: "bold",
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});
