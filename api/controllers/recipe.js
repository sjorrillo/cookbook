export const recipe = (db) => {

    const list = async (req, res) => {
        let query = await db.from('recipe')
            .join('category', 'recipe.categoryid', 'category.id')
            .select('recipe.*', 'category.name as category');
        res.json(query);
    };

    const getById = async (req, res) => {
        const recipeId = req.params.id;
        let recipe = db.from('recipe')
            .where({ id: recipeId })
            .first();

        let ingredients = db.from('ingredient')
            .where({ recipeid: recipeId })
            .select('id', 'name', 'amount');
            

        let comments = db.from('comment')
            .where({ recipeid: recipeId })
            .select('id', 'content')

        let result = await Promise.all([recipe, ingredients, comments])
        let query = result[0];
        query.ingredients = result[1] || [];
        query.comments = result[2] || [];

        res.json(query);
    };

    const getBySlug = async (req, res) => {
        const recipeSlug = req.params.slug;
        let recipe = await db.from('recipe')
            .join('category', 'recipe.categoryid', 'category.id')
            .where({ 'recipe.slug': recipeSlug })
            .first('recipe.*', 'category.name as category');
        
        if(recipe) {
            const recipeId = recipe.id;
            let ingredients = db.from('ingredient')
                .where({ recipeid: recipeId })
                .select('id', 'name', 'amount');
                

            let comments = db.from('comment')
                .where({ recipeid: recipeId })
                .select('id', 'content');
            
            let result = await Promise.all([ingredients, comments]);
            recipe.ingredients = result[0] || [];
            recipe.comments = result[1] || [];
        }

        res.json(recipe);
    };

    return {
        list,
        getById,
        getBySlug
    };
};