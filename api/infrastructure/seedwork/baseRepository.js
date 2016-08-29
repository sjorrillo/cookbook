import { db } from './db';

const runInTransaction = (func) => {
    return new Promise((resolve, reject) => {
        db.transaction(async (trx) => {
            try {
                const result = await func(trx);
                await trx.commit();
                resolve(result);
            } catch (error) {
                await trx.rollback();
                reject(error);
            }
        });
    });
};

export {
    runInTransaction
};
