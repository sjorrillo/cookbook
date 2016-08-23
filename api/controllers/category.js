export const category = (db) => {

     const list =  async (req, res) => {
        let query = await db.from('category').select();
        res.json(query);
    };

    return {
        list
    };
};