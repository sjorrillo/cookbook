import React, {PropTypes} from 'react';
import RecipeComments from './RecipeComments';

const RecipeDetails = ({recipe}) => {
  return (
      <div>
        <div className="card white details">
            <div className="card-content">
                <div className="card-title menu">
                    <a to={'/recipe/' + recipe.slug} className="truncate">{recipe.name}</a> 
                    <div className="card-tool">
                        <a className="dropdown-button grey-text right" href="javascript:void(0);" data-activates="dropdown1"><i className="material-icons">more_vert</i></a>
                        <ul id="dropdown1" className="dropdown-content">
                            <li><a href="#!">Edite</a></li>
                            <li><a href="#!">Delete</a></li>
                        </ul>
                    </div> 
                </div>
                <div className="card-action grey-text darken-1">
                    <a href="#"><i className="material-icons">label_outline</i><span>{recipe.category}</span></a>
                    <a href="#"><i className="material-icons">chat_bubble_outline</i><span>10</span></a>
                    <a href="#" className="right"><span>{recipe.chef}</span><i className="material-icons">person_pin</i></a>
                </div>
                <div className="grey-text text-darken-2 description">{recipe.preparation}</div>
                <div className="grey-text text-darken-1">Currently rated 4.5 by 8 people</div>
            </div>
        </div>
        <RecipeComments comments={[{id: 1, content: "Test de comentario 01"}, {id: 2, content: "Test de comentario 02"}]}/>
    </div>
  );
};

RecipeDetails.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default RecipeDetails;