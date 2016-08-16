import React, {PropTypes} from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = (props) => {
  return (
    <div className="row">
        {props.recipes.map(recipe =>
          <div key={recipe.id} className="col s12 m6 l4">
            <RecipeCard recipe={recipe}/>
          </div>
        )}
    </div>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired
};

export default RecipeList;