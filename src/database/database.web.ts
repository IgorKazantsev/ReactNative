const STORAGE_KEY = "quiz_leaderboard";

function loadResults() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveResults(results: any[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}

export function initDatabase() {}

export function saveResult(
  username: string,
  score: number,
  percentage: number,
  totalQuestions: number,
  duration: number,
) {
  const results = loadResults();

  results.push({
    id: Date.now(),
    username,
    score,
    percentage,
    totalQuestions,
    correctAnswers: score,
    wrongAnswers: totalQuestions - score,
    duration,
    createdAt: new Date().toLocaleString(),
  });

  saveResults(results);
}

export function getLeaderboard() {
  return loadResults()
    .sort(
      (a: any, b: any) =>
        b.percentage - a.percentage || a.duration - b.duration,
    )
    .slice(0, 5);
}
