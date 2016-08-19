import React, {PropTypes} from 'react';
import RecipeComments from './RecipeComments';
import {Link} from 'react-router';

const RecipeDetails = ({recipe}) => {
  const comments = recipe.comments ? recipe.comments.length : 0;

  return (
      <div>
        <div className="card white details">
            <div className="card-content">
                <div className="card-title menu">
                    <a to={'/recipe/' + recipe.slug} className="truncate">{recipe.name}</a> 
                    <div className="card-tool">
                        <a className="dropdown-button grey-text right" href="javascript:void(0);" data-activates="dropdown1sdf"><i className="material-icons">more_vert</i></a>
                        <ul id="dropdown1sdf" className="dropdown-content">
                            <li><Link to={"/recipe/edit/" + recipe.id}>Edit</Link></li>
                            <li><a href="#!">Delete</a></li>
                        </ul>
                    </div> 
                </div>
                <div className="card-action grey-text darken-1">
                    <a href="javascript:void(0);" className="disabled"><i className="material-icons">label_outline</i><span>{recipe.category}</span></a>
                    <a href="javascript:void(0);" className="disabled"><i className="material-icons">chat_bubble_outline</i><span>{comments}</span></a>
                    <a href="javascript:void(0);" className="right disabled"><span>{recipe.chef}</span><i className="material-icons">person_pin</i></a>
                </div>
                <div className="grey-text text-darken-2 description">
                    {recipe.preparation}
                    {recipe.ingredients && <h5>Ingredients</h5>}
                    <ul>
                    {recipe.ingredients && 
                        recipe.ingredients.map(ingredient =>
                            <li key={ingredient.id}>{ingredient.name} - ({ingredient.amount})</li>
                        )}
                    </ul>
                </div>
                <div className="grey-text text-darken-1">Currently rated {recipe.rating} by {recipe.raters} people</div>
            </div>
        </div>
        <RecipeComments comments={recipe.comments}/>
    </div>
  );
};

RecipeDetails.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default RecipeDetails;