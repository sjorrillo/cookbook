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

//  <div className="row">
//                 <div className="col s12">
//                     <div>
//                         <h1>Recipes</h1>
//                         <input type="button" value="Add Recipe" className="btn" onClick={this.addRecipe}/>
//                         <RecipeList recipes={recipes}/>
//                     </div>
//                 </div>
//             </div>

// <div className="fixed-action-btn" style="bottom: 45px; right: 24px;">
//                             <a className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></a> 
//                         </div>

    render() {
        const {recipes} = this.props;
        return (
           <div>
                <div className="row">
                    <div className="col s12">
                        <h4 className="header">List of Recipes</h4> 
                        
                    </div>
                </div>
                <RecipeList recipes={recipes}/>
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