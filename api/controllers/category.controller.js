import * as categoryRepositoy from '../infrastructure/category.repository';
import * as utils from '../common/utils';
import { appTypes } from '../common/appTypes';

export const category = (session) => {

     const getAll =  async (req, res) => {
        try {
            let categories = await categoryRepositoy.getAll();
            res.json(categories);
        } catch(error) {
            let message = utils.messageResponse(appTypes.statusMessage.error, error);
            res.status(500).json(message);          
        }
    };

    return {
        getAll
    };
};