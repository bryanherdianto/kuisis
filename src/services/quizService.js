export const getCategories = async () => {
  try {
    const response = await fetch('https://opentdb.com/api_category.php');
    const data = await response.json();
    return data.trivia_categories;
  } catch (error) {
    console.error('Error fetching quiz categories:', error);
    throw error;
  }
};

export const getQuizQuestions = async (amount = 10, category = '', difficulty = '') => {
  try {
    let url = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
    
    if (category) {
      url += `&category=${category}`;
    }
    
    if (difficulty) {
      url += `&difficulty=${difficulty}`;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.response_code !== 0) {
      throw new Error(`API Error: ${data.response_code}`);
    }
    
    return data.results;
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    throw error;
  }
};
