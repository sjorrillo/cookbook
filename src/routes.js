import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import ReceipesPage from './components/receipe/ReceipesPage';
import ReceipeManagePage from './components/receipe/ReceipeManagePage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="receipes" component={ReceipesPage} />
    <Route path="receipe" component={ReceipeManagePage} />
    <Route path="receipe/:id" component={ReceipeManagePage} />
    <Route path="about" component={AboutPage} />
  </Route>
);