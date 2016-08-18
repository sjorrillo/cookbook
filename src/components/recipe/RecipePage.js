import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as recipeActions from '../../actions/recipeActions';
import HeadTitle from '../common/HeadTitle';
import RecipeForm from './RecipeForm';
import RecipeDetails from './RecipeDetails';
import toastr from 'toastr';


class RecipePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            recipe: Object.assign({}, this.props.recipe),
            errors: {},
            processing: false
        };

        this.updateRecipeState = this.updateRecipeState.bind(this);
        this.saveRecipe = this.saveRecipe.bind(this);
        this.previousComponent = this.previousComponent.bind(this);
        this.onAddIngredient = this.onAddIngredient.bind(this);
    }

    componentDidMount() {
        this.applyBehaviours();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.recipe !== nextProps.recipe) {
            this.setState({ recipe: Object.assign({}, nextProps.recipe) });
        }
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
        $('select').material_select();
    }

    updateRecipeState(event) {
        const field = event.target.name;
        let recipe = this.state.recipe;
        recipe[field] = event.target.value;
        return this.setState({ recipe: recipe });
    }

    onAddIngredient() {
        debugger;
        let recipe = this.state.recipe;
        recipe.ingredients.push({});
        return this.setState({ recipe: recipe });
    }

    updateIngredientsState(ingredients) {
        debugger;
    }

    saveRecipe(event) {
        event.preventDefault();
        debugger;
        this.setState({ processing: true });
        this.props.actions.saveRecipe(this.state.recipe)
            .then(() => this.backToList())
            .catch(error => {
                toastr.error(error);
                this.setState({ processing: false });
            });
    }

    backToList() {
        this.setState({ processing: false });
        toastr.success('Receipe saved');
        this.context.router.push('/recipes');
    }

    previousComponent() {
        this.context.router.goBack();
    }

    render() {
        return (
            <div className="row">
                <div className="col s12">
                    <HeadTitle title="Recipe Details" navigateBack={this.previousComponent}/>
                </div>
                <div className="col s12">
                    {this.props.details && <RecipeDetails recipe={this.state.recipe}/>}
                    {!this.props.details && <RecipeForm
                        categories={this.props.categories}
                        recipe={this.state.recipe}
                        errors={this.state.errors}
                        onChange={this.updateRecipeState}
                        onSave={this.saveRecipe}
                        saving={this.state.processing}
                        onUpdateIngredients={this.updateIngredientsState.bind(this, this.state.recipe.ingredients)}
                        onAddIngredient={this.onAddIngredient}
                        />}
                </div>
            </div>
        );
    }
}

RecipePage.propTypes = {
    recipe: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    details: PropTypes.bool
};

RecipePage.contextTypes = {
    router: PropTypes.object
};

const getRecipeById = (recipes, id) => {
    const results = recipes.filter(recipe => recipe.id == id);
    if (results.length > 0) return results[0];
    return null;
};

const getRecipeBySlug = (recipes, slug) => {
    const results = recipes.filter(recipe => recipe.slug == slug);
    if (results.length > 0) return results[0];
    return null;
};

const mapStateToProps = (state, ownProps) => {
    debugger;
    let recipe = { id: '', name: '', category: '', chef: '', preparation: '', ingredients: {} };
    let showDetails = false;
    if (ownProps.params.slug) {
        const slug = ownProps.params.slug;
        showDetails = true;
        if (slug) {
            recipe = getRecipeBySlug(state.recipes, slug);
        }
    }
    else {
        const recipeId = ownProps.params.id;
        if (recipeId) {
            recipe = getRecipeById(state.recipes, recipeId);
        }
    }

    let categoriesItemList = state.categories.map(category => {
        return {
            value: category.id,
            text: category.name
        };
    });

    // debugger;
    // if(state.ingredients) {
    //     recipe.ingredients = state.ingredients;
    // }

    return {
        recipe: recipe,
        categories: categoriesItemList,
        details: showDetails
    };
};

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(recipeActions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);