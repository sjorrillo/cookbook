import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { CardTool } from './CardTool';
import { Rating } from '../../common/controls/Rating'
import _ from 'lodash';

export const RecipeCard = ({recipe, onDelete}) => {
    const content = _.truncate(recipe.preparation, { length: 250 });
    const dropdownId = `dropdown_${recipe.id}`;

    return (
        <div className="card white">
            <div className="card-content">
                <div className="card-title menu">
                    <Link to={'/recipe/' + recipe.slug} className="truncate">{recipe.name}</Link>
                    <CardTool recipe={recipe} onDelete={onDelete}/>
                </div>
                <div className="grey-text text-darken-2 description">{content}</div>
                <div className="rating-section">
                    <Rating disabled={true} rating={recipe.rating} raters={recipe.raters}/>
                </div>
            </div>
            <div className="card-action grey-text darken-1">
                <a href="javascript:void(0);" className="disabled"><i className="material-icons">label_outline</i><span>{recipe.category}</span></a>
                <a href="javascript:void(0);" className="disabled"><i className="material-icons">chat_bubble_outline</i><span>{recipe.nrocomments}</span></a>
                <a href="javascript:void(0);" className="disabled right"><span>{recipe.chef}</span><i className="material-icons">person_pin</i></a>
            </div>
        </div>
    );
};

RecipeCard.propTypes = {
    recipe: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
};