import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as recipeActions from '../../actions/recipeActions';
import appTypes from '../../common/appTypes';
import HeadTitle from '../common/HeadTitle';
import RecipeDetails from './RecipeDetails';
import toastr from 'toastr';
import _ from 'lodash';


class RecipeDetailsPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            recipe: Object.assign({}, this.props.recipe)
        };

        this.previousComponent = this.previousComponent.bind(this);
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
                    {!this.props.loading && <RecipeDetails recipe={this.state.recipe}/>}
                </div>
            </div>
        );
    }
}

RecipeDetailsPage.propTypes = {
    recipe: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    slug: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired
};

RecipeDetailsPage.contextTypes = {
    router: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
    let slug = (ownProps.params.slug || "").toLowerCase();

    return {
        recipe: state.recipe || {},
        loading: state.ajaxCallsInProgress > 0,
        slug
    };
};

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(recipeActions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetailsPage);