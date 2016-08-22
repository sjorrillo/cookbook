export const category = (db) => {
    return {
        list: (req, res) => {
            // debugger;
            //  return new Promise((resolve, reject) => {
            //         resolve(Object.assign([], categories));
            //     });
            //     });
            let response = db.from('category').select('*');

            console.log("hola");
            console.log(response);
            res.json({ message: 'list of categories' });
        }
    };
};