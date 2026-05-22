import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { categories } from "../constants/categories";
import { difficulties } from "../constants/difficulties";
import { questionTypes } from "../constants/questionTypes";

export default function HomeScreen() {
  const [category, setCategory] = useState("18");
  const [difficulty, setDifficulty] = useState("easy");
  const [type, setType] = useState("multiple");

  function startQuiz() {
    router.push({
      pathname: "/quiz",
      params: {
        category,
        difficulty,
        type,
      },
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz App</Text>

      <Text style={styles.subtitle}>React Native viktoriinirakendus</Text>

      <Text style={styles.label}>Vali kategooria</Text>

      <View style={styles.pickerBox}>
        <Picker selectedValue={category} onValueChange={setCategory}>
          {categories.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Vali raskusaste</Text>

      <View style={styles.pickerBox}>
        <Picker selectedValue={difficulty} onValueChange={setDifficulty}>
          {difficulties.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Vali küsimuse tüüp</Text>

      <View style={styles.pickerBox}>
        <Picker selectedValue={type} onValueChange={setType}>
          {questionTypes.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={startQuiz}>
        <Text style={styles.buttonText}>Alusta viktoriini</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.replace("/leaderboard")}
      >
        <Text style={styles.buttonText}>Leaderboard</Text>
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
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  pickerBox: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
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
