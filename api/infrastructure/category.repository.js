import { db } from './seedwork/db';

const getAll =  async () => {
    let results = await db
        .from('category')
        .select()
        .catch((err) => { throw err; });

    return results;
};

const getById =  async (id) => {
    let category = await db
        .from('category')
        .where({ id: id })
        .first();

    return category;
};

export {
    getAll,
    getById
};
