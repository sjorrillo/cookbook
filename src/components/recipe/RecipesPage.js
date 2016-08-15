import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as recipeActions from '../../actions/recipeActions';
import RecipeList from './RecipeList';
import {browserHistory} from 'react-router';

class RecipesPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.addRecipe = this.addRecipe.bind(this);
    }

    addRecipe() {
        browserHistory.push('/recipe');
    }

    render() {
        const {recipes} = this.props;
        return (
            <div className="row">
                <div className="col s12">
                    <div>
                        <h1>Recipes</h1>
                        <input type="button" value="Add Recipe" className="btn" onClick={this.addRecipe}/>
                        <RecipeList recipes={recipes}/>
                    </div>
                </div>
            </div>
        );
    }
}

RecipesPage.propTypes = {
    recipes: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

const mapStateToPorps = (state, ownProps) => ({ recipes: state.recipes });

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(recipeActions, dispatch)});

export default connect(mapStateToPorps, mapDispatchToProps)(RecipesPage);