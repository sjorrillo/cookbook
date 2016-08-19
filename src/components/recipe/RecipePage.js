import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as recipeActions from '../../actions/recipeActions';
import appTypes from '../../common/appTypes';
import HeadTitle from '../common/HeadTitle';
import RecipeForm from './RecipeForm';
import RecipeDetails from './RecipeDetails';
import toastr from 'toastr';
import _ from 'lodash';


class RecipePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            recipe: Object.assign({}, this.props.recipe),
            errors: {},
            processing: false
        };

        
        this.saveRecipe = this.saveRecipe.bind(this);
        this.previousComponent = this.previousComponent.bind(this);
        this.updateRecipeState = this.updateRecipeState.bind(this);
        this.onAddIngredient = this.onAddIngredient.bind(this);
        this.onRemoveRecord = this.onRemoveRecord.bind(this);
        this.onUpdateIngredient = this.onUpdateIngredient.bind(this);
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
        $('select').material_select(this.updateRecipeState);
        
        if(!this.props.details && this.state.recipe.ingredients) {
            this.addIngredient(4);//limit of ingredients
        }
    }

    updateRecipeState(event) {
        let value = "";
        let field = "";
        if(!event) {
            field = "category";
            value = $("select[name='category']").val();
        }
        else {
            value = event.target.value;
            field = event.target.name;
        }
        
        let recipe = this.state.recipe;
        recipe[field] = value;
        this.setState({ recipe: recipe });
    }

    addIngredient(limitRecords = 0) {
        let recipe = this.state.recipe;
        let ingredientList = _.filter(recipe.ingredients, function (x) { return x.entityState == undefined || x.entityState != 3; });//deleted
        if (limitRecords == 0 || ingredientList.length < limitRecords) {
            let canAddNew = !_.some(ingredientList, { entityState: 0 });
            if (canAddNew) {
                var newRecord = { id: this.getNewId(), name: "", amount: "", entityState: 0 }; //none;
                recipe.ingredients = [...recipe.ingredients, newRecord];
                this.setState({ recipe: recipe });
            }
        }
    }

    getNewId() {
        let ingredients = [...this.state.recipe.ingredients];
        if (ingredients.length == 0)
            return 1;

        let sortedItems = _.sortBy(ingredients, function (x) {
            return x.Id;
        });

        let lastItem = _.last(sortedItems);
        return lastItem.id + 1;
    }

    changeIngredientState(ingredientId, entityState) {
        let recipe = this.state.recipe;
        let ingredientList = [...recipe.ingredients];
        let ingredient = _.find(ingredientList, { id: ingredientId });
        const index = _.indexOf(ingredientList, ingredient);
        let record = Object.assign({}, ingredient);

        if (index !== -1) {
            record.entityState = entityState;
            ingredientList.splice(index, 1, record);
        }

        recipe.ingredients = ingredientList;
        this.setState({ recipe: recipe });
    }

    onAddIngredient(id) {
        this.changeIngredientState(id, 1);//added
    }

    onRemoveRecord(id) {
        this.changeIngredientState(id, 3);//deleted
    }

    onUpdateIngredient(id, event) {
        let recipe =  this.state.recipe;
        let ingredientList = [...recipe.ingredients];
        let ingredient = _.find(ingredientList, { id: id});
        const index = _.indexOf(ingredientList, ingredient);
        
        let record = Object.assign({}, ingredient);
        const field = event.target.name;
        record[field] = event.target.value;
      
        if (index !== -1) {
            if (record.entityState == 4) {//unchanged
                record.entityState = 2;//modified
            }
        }

        ingredientList.splice(index, 1, record);
      
       recipe.ingredients = ingredientList;
       this.setState({ recipe: recipe });
    }

    saveRecipe(event) {
        event.preventDefault();
        this.setState({ processing: true });
        let recipe = Object.assign({}, this.state.recipe);
        recipe.ingredients = recipe.ingredients.filter((recipe) => recipe.entityState != 0);
        this.props.actions.saveRecipe(recipe)
            .then(() => this.backToList())
            .catch(error => {
                toastr.error(error);
                this.setState({ processing: false });
                throw(error);
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
                        recipe={this.state.recipe}
                        categories={this.props.categories}
                        onSave={this.saveRecipe}
                        onChange={this.updateRecipeState}
                        onAddIngredient={this.onAddIngredient}
                        onRemoveRecord={this.onRemoveRecord}
                        onUpdateIngredient={this.onUpdateIngredient}
                        saving={this.state.processing}
                        errors={this.state.errors}
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
    let recipe = { id: 0, name: '', category: '', chef: '', preparation: '', raters:0, rating: 0, ingredients: []};
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

    return {
        recipe: recipe,
        categories: categoriesItemList,
        details: showDetails
    };
};

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(recipeActions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);