import React, {PropTypes} from 'react';
import RecipeListRow from './RecipeListRow';

const RecipeList = (props) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th>Length</th>
      </tr>
      </thead>
      <tbody>
      {props.recipes.map(recipe =>
        <RecipeListRow key={recipe.id} recipe={recipe}/>
      )}
      </tbody>
    </table>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired
};

export default RecipeList;