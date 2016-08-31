import React, { PropTypes } from 'react';
import { RecipeIngredient } from './RecipeIngredient';
import { appTypes } from '../../../common/appTypes';

export const RecipeIngredientList = ({ingredients, onAddIngredient, onRemoveRecord, onUpdateIngredient}) => {
    
    let records = ingredients.filter((ingredient) => ingredient.entityState != appTypes.trackState.deleted);

    return (
        <div className="row">
            <h4 className="header">Ingredients</h4>
            {records.map(ingredient =>
                <RecipeIngredient
                    key={ingredient.id}
                    ingredient={ingredient}
                    onChange={onUpdateIngredient.bind(this, ingredient.id)}
                    onAddRecord={onAddIngredient}
                    onRemoveRecord={onRemoveRecord}
                    addState={ingredient.entityState == 0}/>
            )}
        </div>
    );
};

RecipeIngredientList.propTypes = {
    ingredients: PropTypes.array.isRequired,
    onAddIngredient: PropTypes.func.isRequired,
    onRemoveRecord: PropTypes.func.isRequired,
    onUpdateIngredient: PropTypes.func.isRequired
};