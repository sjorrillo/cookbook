import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const RecipeListRow = ({recipe}) => {
  return (
    <tr>
      <td><a href={recipe.watchHref} target="_blank">Watch</a></td>
      <td><Link to={'/recipe/' + recipe.id}>{recipe.title}</Link></td>
      <td>{recipe.authorId}</td>
      <td>{recipe.category}</td>
      <td>{recipe.length}</td>
    </tr>
  );
};

RecipeListRow.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default RecipeListRow;