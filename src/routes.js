import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import AboutPage from './components/about/AboutPage';
import RecipesPage from './components/recipe/RecipesPage';
import RecipePage from './components/recipe/RecipePage';
import RecipeDetailsPage from './components/recipe/RecipeDetailsPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={RecipesPage} />
    <Route path="recipes" component={RecipesPage} />
    <Route path="recipe/:slug" component={RecipeDetailsPage} />
    <Route path="recipe" component={RecipePage} />
    <Route path="recipe/edit/:id" component={RecipePage} />
    <Route path="about" component={AboutPage} />
  </Route>
);