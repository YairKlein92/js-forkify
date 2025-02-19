// import {async} from 'regenerator-runtime';
import { API_URL, RESULTS_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    // instead ot having the whole code here
    const data = await getJSON(`${API_URL}/${id}`);

    // console.log(res, data);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.sourceUrl,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    // temporary error handling
    console.error(`${err} bumm bumm`);
    throw err;
  }
};
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data, 'data');
    state.search.results = data.data.recipes.map(request => {
      return {
        id: request.id,
        title: request.title,
        publisher: request.publisher,
        image: request.image_url,
      };
    });
  } catch (err) {
    console.error(`${err} bumm bumm`);
    throw err;
  }
};

loadSearchResults('pizza');
// page number is default 1
export const getSearchResultsPerPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  console.log(`Updating servings to: ${newServings}`); // Debugging log
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQ = oldQ * newServings / oldServings // 2 * 8 / 4 = 4
  });

  state.recipe.servings = newServings;
};
