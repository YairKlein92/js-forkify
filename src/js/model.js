import async from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
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
