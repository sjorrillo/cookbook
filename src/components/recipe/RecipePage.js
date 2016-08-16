import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as recipeActions from '../../actions/recipeActions';
import RecipeForm from './RecipeForm';
import RecipeDetails from './RecipeDetails';
import toastr from 'toastr';


class RecipeManagePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            recipe: Object.assign({}, this.props.recipe),
            errors: {},
            processing: false
        };

        this.updateRecipeState = this.updateRecipeState.bind(this);
        this.saveRecipe = this.saveRecipe.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.recipe !== nextProps.recipe) {
            this.setState({recipe: Object.assign({}, nextProps.recipe)});
        }
    }

    updateRecipeState(event) {
        const field = event.target.name;
        let recipe = this.state.recipe;
        recipe[field] = event.target.value;
        return this.setState({recipe: recipe});
    }

    saveRecipe(event) {
        event.preventDefault();
        this.setState({processing: true});
        this.props.actions.saveRecipe(this.state.recipe)
            .then(() => this.backToList())
            .catch(error => {
                toastr.error(error);
                this.setState({processing: false});
            });
    }

    backToList() {
        this.setState({processing: false});
        toastr.success('Receipe saved');
        this.context.router.push('/recipes');
    }

    render() {
        return (
            <div className="row">
                <div className="col s12">
                    {this.props.details && <RecipeDetails recipe={this.state.recipe}/>}
                    {!this.props.details && <RecipeForm
                        allAuthors={this.props.authors}
                        recipe={this.state.recipe}
                        errors={this.state.errors}
                        onChange={this.updateRecipeState}
                        onSave={this.saveRecipe}
                        saving={this.state.processing}
                        />}
                </div>
            </div>
        );
    }
}

RecipeManagePage.propTypes = {
    recipe: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    details: PropTypes.bool
};

RecipeManagePage.contextTypes = {
    router: PropTypes.object
};

const getRecipeById = (recipes, id) => {
    const results = recipes.filter(recipe => recipe.id == id);
    if(results.length > 0) return results[0];
    return null;
};

const getRecipeBySlug = (recipes, slug) => {
    const results = recipes.filter(recipe => recipe.slug == slug);
    if(results.length > 0) return results[0];
    return null;
};

const mapStateToPorps = (state, ownProps) => {
    let recipe = { id: '', name: '', category: '', chef: '', preparation: '', ingredients: {} };
    let showDetails = false;
    if(ownProps.params.slug) {
        const slug = ownProps.params.slug;
        showDetails = true;
        if(slug) {
            recipe = getRecipeBySlug(state.recipes, slug);
        }
    }
    else {
        const recipeId = ownProps.params.id;
        if(recipeId) {
            recipe = getRecipeById(state.recipes, recipeId);
        }
    }
     
    let authorsItemList = state.authors.map(author => {
        return {
            value: author.id,
            text: author.firstName
        };
    });
    
    return {
        recipe: recipe,
        authors: authorsItemList,
        details: showDetails
    };
};

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(recipeActions, dispatch) });

export default connect(mapStateToPorps, mapDispatchToProps)(RecipeManagePage);