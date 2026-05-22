import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { fetchQuestions } from "../services/triviaApi";
import { decodeText } from "../utils/decodeText";

export default function QuizScreen() {
  const params = useLocalSearchParams();

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(15);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    if (loading || selectedAnswer) return;

    if (timeLeft === 0) {
      goToNextQuestion(score);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, loading, selectedAnswer, score]);

  async function loadQuestions() {
    setLoading(true);
    setStartTime(Date.now());

    console.log("QUESTION TYPE:", params.type);

    const data = await fetchQuestions(
      10,
      String(params.category || "18"),
      String(params.difficulty || "easy"),
      String(params.type || "multiple"),
    );

    setQuestions(data || []);
    setLoading(false);
  }

  function handleAnswer(answer: string) {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);

    const correctAnswer = questions[currentQuestion].correct_answer;

    const newScore = answer === correctAnswer ? score + 1 : score;

    setScore(newScore);

    setTimeout(() => {
      goToNextQuestion(newScore);
    }, 1000);
  }

  function goToNextQuestion(finalScore: number) {
    setSelectedAnswer("");
    setTimeLeft(15);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const percentage = Math.round((finalScore / questions.length) * 100);

      const duration = Math.round((Date.now() - startTime) / 1000);

      router.replace({
        pathname: "/result",
        params: {
          score: finalScore,
          total: questions.length,
          percentage,
          duration,
        },
      });
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />

        <Text>Loading questions...</Text>
      </View>
    );
  }

  if (!questions.length) {
    return (
      <View style={styles.center}>
        <Text>No questions found.</Text>
      </View>
    );
  }

  const question = questions[currentQuestion];

  const answers = [
    ...question.incorrect_answers,
    question.correct_answer,
  ].sort();

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>
        Question {currentQuestion + 1} / {questions.length}
      </Text>

      <Text style={styles.timer}>Time left: {timeLeft}s</Text>

      <Text style={styles.question}>{decodeText(question.question)}</Text>

      {answers.map((answer: string) => {
        const isSelected = selectedAnswer === answer;

        const isCorrect = answer === question.correct_answer;

        return (
          <TouchableOpacity
            key={answer}
            style={[
              styles.answerButton,
              isSelected && isCorrect && styles.correctButton,
              isSelected && !isCorrect && styles.wrongButton,
            ]}
            onPress={() => handleAnswer(answer)}
            disabled={!!selectedAnswer}
          >
            <Text style={styles.answerText}>{decodeText(answer)}</Text>
          </TouchableOpacity>
        );
      })}

      <Text style={styles.score}>Score: {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f5f5f5",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  counter: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: "600",
  },
  timer: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#dc2626",
  },
  question: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  answerButton: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  correctButton: {
    backgroundColor: "#22c55e",
  },
  wrongButton: {
    backgroundColor: "#ef4444",
  },
  answerText: {
    fontSize: 18,
  },
  score: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
