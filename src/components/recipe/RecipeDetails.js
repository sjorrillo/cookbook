import React, { PropTypes } from 'react';
import { RecipeComments } from './widgets/RecipeComments';
import { CardTool } from './widgets/CardTool';
import { Rating } from '../common/controls/Rating'
import { Link } from 'react-router';

export const RecipeDetails = ({recipe, onDelete, onRatingClick, showYourRating}) => {
    const comments = (recipe.commentlist || []).length;
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
                        <a href="javascript:void(0);" className="disabled"><i className="material-icons">chat_bubble_outline</i><span>{comments}</span></a>
                        <a href="javascript:void(0);" className="right disabled"><span>{recipe.chef}</span><i className="material-icons">person_pin</i></a>
                    </div>
                    <div className="grey-text text-darken-2 description">
                        <div>
                            {recipe.preparation}
                        </div>
                        <div className="row">
                            <ul className="collection with-header col s12 m12 l10">
                                <li className="collection-header"><h5>Ingredients</h5></li>
                                {recipe.ingredients &&
                                    recipe.ingredients.map(ingredient =>
                                        <li key={ingredient.id} className="collection-item">{ingredient.name}<span className="badge">{ingredient.amount}</span></li>
                                    ) }
                            </ul>
                        </div>
                    </div>
                    <div className="rating-section">
                        <Rating size={20} rating={recipe.rating} raters={recipe.raters} onRatingClick={onRatingClick} showYourRating={showYourRating}/>
                    </div>
                </div>
            </div>
            {recipe.commentlist && <RecipeComments comments={recipe.commentlist}/>}
        </div>
    );
};

RecipeDetails.propTypes = {
    recipe: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onRatingClick: PropTypes.func.isRequired,
    showYourRating: PropTypes.bool
};