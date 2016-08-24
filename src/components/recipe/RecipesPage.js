import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as recipeActions from '../../actions/recipeActions';
import RecipeList from './RecipeList';
import RecipeFilter from './controls/RecipeFilter';
import {browserHistory, Link} from 'react-router';
import toastr from 'toastr';

class RecipesPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.addRecipe = this.addRecipe.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.updatFilterState = this.updatFilterState.bind(this);
        this.state = {
            categoryId: 0
        };
    }

    componentDidMount() {
        this.applyBehaviours();
    }

    componentDidUpdate() {
        this.applyBehaviours();
    }

    applyBehaviours() {
        $('.dropdown-button').dropdown({
            constrain_width: false, // Does not change width of dropdown to that of the activator
            belowOrigin: true,
            alignment: 'right'
        });

        $('select').material_select(this.updatFilterState);
    }

     updatFilterState(event) {
        let value = 0;
        if(!event) {
            value = parseInt($("select[name='category']").val());
        }
        else {
            value = parseInt(event.target.value);
        }
        this.setState({ categoryId: value });
    }

    addRecipe() {
        browserHistory.push('/recipe');
    }

    deleteRecipe(recipe) {
        if(confirm(`Do you want to remove the recipe: "${recipe.id} - ${recipe.name}"`)) {
        this.props.actions.deleteRecipe(recipe.id)
            .then(() => toastr.success("Recipe deleted"))
            .catch(error => {
                toastr.error(error);
                throw(error);
            });
        }
    }

    render() {
        let {recipes, categories, searchText} = this.props;
        const categoryId = this.state.categoryId;

        recipes = recipes.filter(recipe => ((categoryId || 0) == 0 || recipe.categoryid == categoryId) && 
            (!searchText || searchText == "" || (recipe.name || '').toLowerCase().includes(searchText.toLowerCase())));

        return (
            <div>
                <div className="row">
                    <div className="col s12">
                        <RecipeFilter 
                            title="List of Recipes"
                            filter={this.state.categoryId} 
                            categories={categories}
                            onChange={this.updatFilterState}/>
                        <div className="fixed-action-btn fixedAddButton">
                            <Link to="/recipe" className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></Link>
                        </div>
                    </div>
                </div>
                <RecipeList recipes={recipes} onDelete={this.deleteRecipe}/>
            </div>
        );
    }
}

RecipesPage.propTypes = {
    recipes: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    searchText: PropTypes.string.isRequired
};

const mapStateToPorps = (state, ownProps) => {
    return {
        recipes: state.recipes,
        categories: state.categories,
        searchText: state.filter || ""
    };
};

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(recipeActions, dispatch) });

export default connect(mapStateToPorps, mapDispatchToProps)(RecipesPage);