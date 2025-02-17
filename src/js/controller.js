import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './view/recipeView.js';

const { title } = require('process');
// where I attach the markup
const recipeContainer = document.querySelector('.recipe');

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // Load recipe with function from model.js
    await model.loadRecipe(id);

    // rendering recipe
    recipeView.render(model.state.recipe);
    // same as:
    // const recipeView = new recipeView(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

controlRecipes();

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipes));
