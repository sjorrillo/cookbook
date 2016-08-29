import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import autobind from 'autobind-decorator';
import * as recipeActions from '../../actions/recipeActions';
import { RecipeCardList } from './widgets/RecipeCardList';
import { RecipeFilter } from './widgets/RecipeFilter';
import { LoadingWheel } from '../common/controls/LoadingWheel';
import { ConfirmDialog } from '../common/controls/ConfirmDialog';

import toastr from 'toastr';

const mapStateToPorps = (state, ownProps) => {
    return {
        recipes: state.recipes,
        categories: state.categories,
        searchText: state.filter || "",
        loading: state.ajaxCallsInProgress > 0,
        deletingMessage: ""
    };
};

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(recipeActions, dispatch) });

@connect(mapStateToPorps, mapDispatchToProps)
export class RecipesPage extends React.Component {

    static propTypes = {
        recipes: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired,
        categories: PropTypes.array.isRequired,
        searchText: PropTypes.string.isRequired,
        loading: PropTypes.bool.isRequired,
        deleteSettings: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
            objectId: PropTypes.oneOfType([
                PropTypes.number.isRequired,
                PropTypes.string.isRequired
            ]),
        })
    };

    constructor(props, context) {
        super(props, context);
        
        this.state = {
            categoryId: 0,
            deleteSettings: {
                id: 'confirmationModal',
                title: 'Delete Recipe',
                message: '',
                objectId: 0
            }
        };
    }

    componentDidMount() {
        this.applyBehaviours();
        this.props.actions.loadRecipes();
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

    @autobind
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

    @autobind
    confirmDeleteRecipe(recipe) {
        let settings = Object.assign({}, this.state.deleteSettings);
        settings.message = `Are you sure you want to remove the recipe: "${recipe.name}"`;
        settings.objectId = recipe.id;
        this.setState({deleteSettings: settings});
        $(`#${this.state.deleteSettings.id}`).openModal();
    }

    @autobind
    deleteRecipe(id) {
       if(id) {
            this.props.actions.deleteRecipe(id)
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
                {this.props.loading && <div className="row">
                    <div className="col s12 center-align">
                        <LoadingWheel active={this.props.loading}/>
                    </div>
                </div>}               
                {!this.props.loading && <RecipeCardList recipes={recipes} onDelete={this.confirmDeleteRecipe}/>}

                 <ConfirmDialog 
                    id={this.state.deleteSettings.id} 
                    title={this.state.deleteSettings.title} 
                    message={this.state.deleteSettings.message}
                    objectId={this.state.deleteSettings.objectId}
                    onOkAction={this.deleteRecipe}
                    />
            </div>
        );
    }
}