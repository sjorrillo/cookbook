import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as recipeActions from '../../actions/recipeActions';
import { appTypes } from '../../common/appTypes';
import { appConfig } from '../../common/appConfig';
import { HeadTitle } from '../common/HeadTitle';
import { RecipeForm } from './RecipeForm';
import { categoriesFormattedForDropdown } from '../../selectors/Dropdown';
import autobind from 'autobind-decorator';
import toastr from 'toastr';
import _ from 'lodash';

const mapStateToProps = (state, ownProps) => {
    let recipe = { id: 0, name: '', categoryid: '0', chef: '', preparation: '', raters:0, rating: 0, commentlist: [], ingredients: []};
    let id = parseInt(ownProps.params.id || 0);
    if(id != 0)
        recipe = state.recipe || {};
        
    return {
        recipe,
        categories: categoriesFormattedForDropdown(state.categories),
        loading: state.ajaxCallsInProgress > 0,
        id
    };
};

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(recipeActions, dispatch) });

@connect(mapStateToProps, mapDispatchToProps)
export class RecipePage extends React.Component {
    
    static propTypes = {
        recipe: PropTypes.object.isRequired,
        categories: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired,
        id: PropTypes.number.isRequired,
        loading: PropTypes.bool.isRequired
    };

    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            recipe: Object.assign({}, this.props.recipe),
            errors: {},
            processing: false
        };
    }

    componentDidMount() {
        if(this.props.id !== 0) {
            this.props.actions.getRecipeById(this.props.id);
        }

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
        if(this.state.recipe.ingredients) {
            this.addIngredient(appConfig.maxIngredients);
        }
    }

    @autobind
    updateRecipeState(event) {
        const field = event.target.name;
        let recipe = this.state.recipe;
        recipe[field] = event.target.value;
        this.setState({ recipe: recipe });
    }

    changeIngredientState(ingredientId, entityState) {
        let recipe = this.state.recipe;
        let ingredientList = [...recipe.ingredients];
        let ingredient = _.find(ingredientList, { id: ingredientId });
        const index = _.indexOf(ingredientList, ingredient);
        let record = Object.assign({}, ingredient);

        if (index !== -1) {
            if(record.entityState && record.entityState == appTypes.trackState.added) {
                 ingredientList.splice(index, 1);
            } else {
                record.entityState = entityState;
                ingredientList.splice(index, 1, record);
            }
        }

        recipe.ingredients = ingredientList;
        this.setState({ recipe: recipe });
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

    addIngredient(limitRecords = 0) {
        let recipe = this.state.recipe;
        let ingredientList = _.filter(recipe.ingredients, function (x) { return x.entityState == undefined || x.entityState != appTypes.trackState.deleted; });//deleted
        if (limitRecords == 0 || ingredientList.length < limitRecords) {
            let canAddNew = !_.some(ingredientList, { entityState: appTypes.trackState.none });
            if (canAddNew) {
                let newRecord = { id: this.getNewId(), name: "", amount: "", entityState: appTypes.trackState.none }; //none;
                recipe.ingredients = [...recipe.ingredients, newRecord];
                this.setState({ recipe: recipe });
            }
        }
    }

    @autobind
    onAddIngredient(id) {
        this.changeIngredientState(id, appTypes.trackState.added);
    }

    @autobind
    onRemoveRecord(id) {
        this.changeIngredientState(id, appTypes.trackState.deleted);
    }

    @autobind
    onUpdateIngredient(id, event) {
        let recipe =  this.state.recipe;
        let ingredientList = [...recipe.ingredients];
        let ingredient = _.find(ingredientList, { id: id});
        const index = _.indexOf(ingredientList, ingredient);
        
        let record = Object.assign({}, ingredient);
        const field = event.target.name;
        record[field] = event.target.value;
      
        if (index !== -1) {
            if (record.entityState == undefined || record.entityState == appTypes.trackState.unchanged) {
                record.entityState = appTypes.trackState.modified;
            }
        }

        ingredientList.splice(index, 1, record);
      
       recipe.ingredients = ingredientList;
       this.setState({ recipe: recipe });
    }

    @autobind
    saveRecipe(event) {
        event.preventDefault();
        let recipe = Object.assign({}, this.state.recipe);
        if(!this.isValid(recipe)) return;

        this.setState({ processing: true });
        recipe.ingredients = recipe.ingredients.filter((recipe) => recipe.entityState != appTypes.trackState.none);

        this.props.actions.saveRecipe(recipe)
            .then(() => this.backToList())
            .catch(error => {
                toastr.error(error);
                this.setState({ processing: false });
                throw(error);
            });
    }

    @autobind
    previousComponent() {
        this.context.router.goBack();
    }

    backToList() {
        this.setState({ processing: false });
        toastr.success('Receipe saved');
        this.context.router.push('/recipes');
    }

    isValid(recipe) {
        let errors = {};
        if(!recipe.name || recipe.name.length == 0) {
            errors.name = 'The name is required.';
        }
        else if(recipe.name.length < 3) {
            errors.name = 'The name must have at least 3 charcaters.';
        }

        if((recipe.categoryid || 0) == 0) {
            errors.categoryid = 'The category is required.';
        }

        if(!recipe.chef || recipe.chef.length == 0) {
            errors.chef = 'The chef is required.';
        }

        if(!recipe.preparation || recipe.preparation.length == 0) {
            errors.preparation = 'The description is required.';
        }

        this.setState({errors : errors});
        return _.isEmpty(errors);
    }

    render() {
        return (
            <div className="row">
                <div className="col s12">
                    <HeadTitle title="Recipe Details" navigateBack={this.previousComponent}/>
                </div>
                <div className="col s12">
                    {!this.props.loading && <RecipeForm
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