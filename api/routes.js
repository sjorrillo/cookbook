import {category} from './controllers/category';

export const routes = (app, router, db) => {
    const route = (handler) => {
        return handler(db);
    };

    // category
    const categoryController = route(category);
    //app.get("/categories", categoryController.list);
    router.route('/categories')
        .get(categoryController.list);

    // catch-all
    router.route('*')
        .get((req, res) => res.status(404).json({ error:'Invalid GET request'}))
        .post((req, res) => res.status(404).json({ error:'Invalid POST request'}))
        .delete((req, res) => res.status(404).json({ error:'Invalid DELETE request'}));
};