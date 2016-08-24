import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import _ from 'lodash';

const RecipeCard = ({recipe, onDelete}) => {
    const content = _.truncate(recipe.preparation, { length: 250 });
    const dropdownId = `dropdown_${recipe.id}`;

    return (
        <div className="card white">
            <div className="card-content">
                <div className="card-title menu">
                    <Link to={'/recipe/' + recipe.slug} className="truncate">{recipe.name}</Link>
                    <div className="card-tool">
                        <a className="dropdown-button grey-text right" href="javascript:void(0);" data-activates={dropdownId}><i className="material-icons">more_vert</i></a>
                        <ul id={dropdownId} className="dropdown-content">
                            <li><Link to={"/recipe/edit/" + recipe.id}>Edit</Link></li>
                            <li><a href="javascript:void(0);" onClick={onDelete.bind(this, recipe)}>Delete</a></li>
                        </ul>
                    </div>
                </div>
                <div className="grey-text text-darken-2 description">{content}</div>
                <div className="grey-text text-darken-1">Currently rated {recipe.rating} by {recipe.raters} people</div>
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

export default RecipeCard;