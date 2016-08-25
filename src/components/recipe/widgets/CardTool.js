import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export const CardTool = ({recipe, onDelete}) => {
    const dropdownId = `dropdown_${recipe.id}`;

    return (
        <div className="card-tool">
            <a className="dropdown-button grey-text right" href="javascript:void(0);" data-activates={dropdownId}><i className="material-icons">more_vert</i></a>
            <ul id={dropdownId} className="dropdown-content">
                <li><Link to={"/recipe/edit/" + recipe.id}>Edit</Link></li>
                <li><a href="javascript:void(0);" onClick={onDelete.bind(this, recipe)}>Delete</a></li>
            </ul>
        </div>
    );
};

CardTool.propTypes = {
    recipe: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
};