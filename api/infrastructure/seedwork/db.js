import knex from 'knex';
import { dbConfig } from './dbConfig';

let dbContext;
const initialize = () => {
    if(!dbContext) {
        dbContext = knex(dbConfig.pg);
    }
    return dbContext;
}

export const db = initialize();
