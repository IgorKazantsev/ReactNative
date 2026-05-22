export async function fetchQuestions(
  amount = 10,
  category = "",
  difficulty = "",
  type = "multiple",
) {
  try {
    let url = `https://opentdb.com/api.php?amount=${amount}`;

    if (category) {
      url += `&category=${category}`;
    }

    if (difficulty) {
      url += `&difficulty=${difficulty}`;
    }

    if (type) {
      url += `&type=${type}`;
    }

    console.log("API URL:", url);

    const response = await fetch(url);
    const data = await response.json();

    console.log("API DATA:", data);

    return data.results || [];
  } catch (error) {
    console.log("API ERROR:", error);
    return [];
  }
}
