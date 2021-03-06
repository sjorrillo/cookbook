import { category } from './controllers/category.controller';
import { recipe } from './controllers/recipe.controller';

export const routes = (router, session) => {
    const route = (handler) => {
        return handler(session);
    };

    // Category
    const categoryController = route(category);
    router.route('/categories').get(categoryController.getAll);

    // Recipe
    const recipeController = route(recipe);
    router.route('/recipes')
        .get(recipeController.getAll)
        .post(recipeController.addRecipe);

    router.route('/recipes/:id')
        .get(recipeController.getById)
        .put(recipeController.updateRecipe)
        .delete(recipeController.deleteRecipe)
        .patch(recipeController.rateRecipe);
        
    router.route('/recipes/:id/comments')
        .put(recipeController.addComment)
        .delete(recipeController.deleteComment);

    router.route('/recipes/details/:slug').get(recipeController.getBySlug);

    // catch-all
    router.route('*')
        .get((req, res) => res.status(404).json({ error:'Invalid GET request'}))
        .post((req, res) => res.status(404).json({ error:'Invalid POST request'}))
        .delete((req, res) => res.status(404).json({ error:'Invalid DELETE request'}));
};