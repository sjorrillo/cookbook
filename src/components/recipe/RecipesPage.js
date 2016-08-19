import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as recipeActions from '../../actions/recipeActions';
import RecipeList from './RecipeList';
import RecipeFilter from './controls/RecipeFilter';
import {browserHistory, Link} from 'react-router';

class RecipesPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.addRecipe = this.addRecipe.bind(this);
        this.updatFilterState = this.updatFilterState.bind(this);
        this.state = {
            category: ""
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
        let value = "";
        if(!event) {
            value = $("select[name='category']").val();
        }
        else {
            value = event.target.value;
        }
        this.setState({ category: value });
    }

    addRecipe() {
        browserHistory.push('/recipe');
    }

    render() {
        let {recipes, categories, searchText} = this.props;
        const category = this.state.category;

        recipes = recipes.filter(recipe => (!category || category == "All" || recipe.category == category) && 
            (!searchText || searchText == "" || (recipe.name || '').toLowerCase().includes(searchText.toLowerCase())));

        return (
            <div>
                <div className="row">
                    <div className="col s12">
                        <RecipeFilter 
                            title="List of Recipes"
                            filter={this.state.category} 
                            categories={categories}
                            onChange={this.updatFilterState}/>
                        <div className="fixed-action-btn fixedAddButton">
                            <Link to="/recipe" className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></Link>
                        </div>
                    </div>
                </div>
                <RecipeList recipes={recipes}/>
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