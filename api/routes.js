import {category} from './controllers/category';
import {recipe} from './controllers/recipe';

export const routes = (app, router, db) => {
    const route = (handler) => {
        return handler(db);
    };

    // Category
    const categoryController = route(category);
    router.route('/categories').get(categoryController.list);

    // Recipe
    const recipeController = route(recipe);
    router.route('/recipes')
        .get(recipeController.list)
        .post(recipeController.addRecipe);

    router.route('/recipes/:id')
        .get(recipeController.getById)
        .put(recipeController.updateRecipe)
        .delete(recipeController.deleteRecipe);
        
    router.route('/recipes/details/:slug').get(recipeController.getBySlug);

    // catch-all
    router.route('*')
        .get((req, res) => res.status(404).json({ error:'Invalid GET request'}))
        .post((req, res) => res.status(404).json({ error:'Invalid POST request'}))
        .delete((req, res) => res.status(404).json({ error:'Invalid DELETE request'}));
};