import React, { PropTypes } from 'react';
import { RecipeComments } from './widgets/RecipeComments';
import { CardTool } from './widgets/CardTool';
import { Link } from 'react-router';

export const RecipeDetails = ({recipe, onDelete}) => {
  return (
      <div>
        <div className="card white details">
            <div className="card-content">
                <div className="card-title menu">
                    <a to={'/recipe/' + recipe.slug} className="truncate">{recipe.name}</a> 
                    <CardTool recipe={recipe} onDelete={onDelete}/>
                </div>
                <div className="card-action grey-text darken-1">
                    <a href="javascript:void(0);" className="disabled"><i className="material-icons">label_outline</i><span>{recipe.category}</span></a>
                    <a href="javascript:void(0);" className="disabled"><i className="material-icons">chat_bubble_outline</i><span>{recipe.comments}</span></a>
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
        {recipe.commentlist && <RecipeComments comments={recipe.commentlist}/>}
     </div>
  );
};

RecipeDetails.propTypes = {
  recipe: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};