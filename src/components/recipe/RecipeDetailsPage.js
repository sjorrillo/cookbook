import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as recipeActions from '../../actions/recipeActions';
import { appTypes } from '../../common/appTypes';
import { HeadTitle } from '../common/HeadTitle';
import { RecipeDetails } from './RecipeDetails';
import { ConfirmDialog } from '../common/controls/ConfirmDialog';
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

    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            recipe: Object.assign({}, this.props.recipe),
            newComment: { id: 0, content: '' },
            savingComment: false,
            showYourRating: false,
            deletingRecipe: false,
            errors: {},
            deleteSettings: {
                id: 'confirmationModal',
                title: 'Delete Comment',
                message: '',
                objectId: 0
            }
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
    confirmDeleteRecipe(recipe) {
        let settings = Object.assign({}, this.state.deleteSettings);
        settings.title = "Delete Recipe";
        settings.message = `Are you sure you want to remove the recipe: "${recipe.name}"`;
        settings.objectId = recipe.id;
        this.setState({ deleteSettings: settings, deletingRecipe: true });
        $(`#${this.state.deleteSettings.id}`).openModal();
    }

    deleteRecipe(id) {
        if (id) {
            this.props.actions.deleteRecipe(id)
                .then(() => this.backToList())
                .catch(error => {
                    toastr.error(error);
                    throw (error);
                });
        }
    }

    @autobind
    ratingRecipe(rating) {
        let recipe = this.state.recipe;
        let ratedRecipe = {
            id: recipe.id,
            rating: rating
        };

        this.props.actions.rateRecipe(ratedRecipe)
            .then((obj) => {
                console.log("termino el rating: " + rating);
            })
            .catch(error => {
                toastr.error(error);
                throw (error);
            });
    }

    @autobind
    previousComponent() {
        this.context.router.goBack();
    }

    //Comments
    @autobind
    addComment(event) {
        event.preventDefault();
        let comment = Object.assign({}, this.state.newComment);
        if(!this.isCommentValid(comment)) {
            console.log("Comment is invalid");
            return;
        }

        this.setState({ savingComment: true });
        comment.recipeid = this.state.recipe.id;
        this.props.actions.commentRecipe(comment)
            .then((obj) => {
                this.addCommentToRecipe(obj);
            })
            .catch(error => {
                this.setState({ savingComment: false });
                toastr.error(error);
                throw (error);
            });
    }

    @autobind
    confirmDeleteComment(comment) {
        let settings = Object.assign({}, this.state.deleteSettings);
        settings.title = "Delete Comment";
        settings.message = `Are you sure you want to remove the comment: "${comment.id}"`;
        settings.objectId = comment.id;
        this.setState({ deleteSettings: settings, deletingRecipe: false });
        $(`#${this.state.deleteSettings.id}`).openModal();
    }

    deleteComment(id) {
        this.props.actions.deleteComment(this.state.recipe.id, id)
            .then((obj) => {
                this.deleteCommentFromRecipe(id);
                toastr.success("Commet deleted");
            })
            .catch(error => {
                toastr.error(error);
                throw (error);
            });
    }

    @autobind
    processDelete(id) {
        if(this.state.deletingRecipe) {
            this.deleteRecipe(id);
            return;
        }
        this.deleteComment(id);
    }

    @autobind
    updateCommentState(event) {
        let comment = this.state.newComment;
        let field = event.target.name;
        comment[field] = event.target.value;
        this.setState({ newComment: comment });
    }

    addCommentToRecipe(comment) {
        let recipe = this.state.recipe;
        let comments = [...recipe.commentlist, comment];
        recipe.commentlist = comments;
        this.setState({
            recipe: recipe,
            newComment: { id: 0, content: '' },
            savingComment: false
        });
    }

    deleteCommentFromRecipe(id) {
        let recipe = this.state.recipe;
        let comments = [...recipe.commentlist];

        recipe.commentlist = comments.filter((comment) => comment.id != id);
        this.setState({
            recipe: recipe
        });
    }

    isCommentValid(comment) {
        let errors = {};
        if(!comment.content || comment.content.length == 0) {
            errors.content = 'The content is required.';
        }
        else if(comment.content.length < 4) {
            errors.content = 'The content must have at least 3 charcaters.';
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
                    {!this.props.loading && <RecipeDetails
                        recipe={this.state.recipe}
                        onDelete={this.confirmDeleteRecipe}
                        onRatingClick={this.ratingRecipe}
                        showYourRating={this.state.showYourRating}
                        disabled={this.state.showYourRating}
                        newComment={this.state.newComment}
                        onAddComment={this.addComment}
                        onDeleteComment={this.confirmDeleteComment}
                        onChange={this.updateCommentState}
                        saving={this.state.savingComment}
                        commentErrors={this.state.errors}
                        />}
                </div>

                <ConfirmDialog
                    id={this.state.deleteSettings.id}
                    title={this.state.deleteSettings.title}
                    message={this.state.deleteSettings.message}
                    objectId={this.state.deleteSettings.objectId}
                    onOkAction={this.processDelete}
                    />
            </div>
        );
    }
}