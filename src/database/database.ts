import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("quiz.db");

export function initDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS leaderboard (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      score INTEGER,
      percentage INTEGER,
      totalQuestions INTEGER,
      correctAnswers INTEGER,
      wrongAnswers INTEGER,
      duration INTEGER,
      createdAt TEXT
    );
  `);
}

export function saveResult(
  username: string,
  score: number,
  percentage: number,
  totalQuestions: number,
  duration: number,
) {
  const wrongAnswers = totalQuestions - score;

  db.runSync(
    `
    INSERT INTO leaderboard
    (
      username,
      score,
      percentage,
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      duration,
      createdAt
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [
      username,
      score,
      percentage,
      totalQuestions,
      score,
      wrongAnswers,
      duration,
      new Date().toLocaleString(),
    ],
  );
}

export function getLeaderboard() {
  return db.getAllSync(`
    SELECT *
    FROM leaderboard
    ORDER BY percentage DESC, duration ASC
    LIMIT 5
  `);
}
