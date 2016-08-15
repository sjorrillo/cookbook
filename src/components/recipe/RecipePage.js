import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as recipeActions from '../../actions/recipeActions';
import RecipeForm from './RecipeForm';
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
                    <RecipeForm
                        allAuthors={this.props.authors}
                        recipe={this.state.recipe}
                        errors={this.state.errors}
                        onChange={this.updateRecipeState}
                        onSave={this.saveRecipe}
                        saving={this.state.processing}
                        />
                </div>
            </div>
        );
    }
}

RecipeManagePage.propTypes = {
    recipe: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

RecipeManagePage.contextTypes = {
    router: PropTypes.object
};

const getRecipe = (recipes, id) => {
    const results = recipes.filter(recipe => recipe.id == id);
    if(results.length > 0) return results[0];
    return null;
};

const mapStateToPorps = (state, ownProps) => {
    const recipeId = ownProps.params.id;
    
    let recipe = { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' };

    if(recipeId) {
        recipe = getRecipe(state.recipes, recipeId);
    }

    let authorsItemList = state.authors.map(author => {
        return {
            value: author.id,
            text: author.firstName
        };
    });
    
    return {
        recipe: recipe,
        authors: authorsItemList
    };
};

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(recipeActions, dispatch) });

export default connect(mapStateToPorps, mapDispatchToProps)(RecipeManagePage);