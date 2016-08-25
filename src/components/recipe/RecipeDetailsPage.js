import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as recipeActions from '../../actions/recipeActions';
import { appTypes } from '../../common/appTypes';
import { HeadTitle } from '../common/HeadTitle';
import { RecipeDetails } from './RecipeDetails';
import autobind from 'autobind-decorator';
import toastr from 'toastr';
import _ from 'lodash';

const mapStateToProps = (state, ownProps) => {
    let slug = (ownProps.params.slug || "").toLowerCase();

    return {
        recipe: state.recipe || {},
        loading: state.ajaxCallsInProgress > 0,
        slug
    };
};

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(recipeActions, dispatch) });

@connect(mapStateToProps, mapDispatchToProps)
export class RecipeDetailsPage extends React.Component {
    static propTypes = {
        recipe: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        slug: PropTypes.string.isRequired,
        loading: PropTypes.bool.isRequired
    };

    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            recipe: Object.assign({}, this.props.recipe)
        };
    }

    componentDidMount() {
        this.props.actions.getRecipeBySlug(this.props.slug);

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
    }

    backToList() {
        toastr.success('Recipe deleted');
        this.context.router.push('/recipes');
    }

    @autobind
    deleteRecipe(recipe) {
        if(confirm(`Do you want to remove the recipe: "${recipe.id} - ${recipe.name}"`)) {
        this.props.actions.deleteRecipe(recipe.id)
            .then(() => this.backToList())
            .catch(error => {
                toastr.error(error);
                throw(error);
            });
        }
    }

    @autobind
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
                    {!this.props.loading && <RecipeDetails recipe={this.state.recipe} onDelete={this.deleteRecipe}/>}
                </div>
            </div>
        );
    }
}