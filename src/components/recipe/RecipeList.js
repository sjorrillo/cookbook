import React, {PropTypes} from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({recipes, onDelete}) => {
  return (
    <div className="row">
        {recipes.map(recipe =>
          <div key={recipe.id} className="col s12 m6 l4">
            <RecipeCard recipe={recipe} onDelete={onDelete}/>
          </div>
        )}
    </div>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default RecipeList;