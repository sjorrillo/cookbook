import React, {PropTypes} from 'react';
import RecipeIngredient from './RecipeIngredient';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import appTypes from '../../../common/appTypes';
import _ from 'lodash';

class RecipeIngredientList extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            ingredients: [...this.props.ingredients]
        };
    }

    getNewId() {
        let ingredients = [...this.state.ingredients];
        if (ingredients.length == 0)
            return 1;

        let sortedItems = _.sortBy(ingredients, function (x) {
            return x.Id;
        });

        let lastItem = _.last(sortedItems);
        return lastItem.id + 1;
    }

    updateListState(ingredient) {
        let ingredientList = [...this.state.ingredients];
        const record = _.find(ingredientList, { id: ingredient.id });
        const index = _.indexOf(ingredientList, record);
        if (index !== -1) {
            if (record.entityState == 4) {//unchanged
                ingredient.entityState = 2;//modified
                ingredientList.splice(index, 1, ingredient);
            }
        }
        else {
            ingredientList.push(ingredient);
        }

        this.setState({ ingredients: ingredientList });
        if (ingredient.entityState != 0 && record.entityState != 4) {
            this.props.onUpdateIngredients(ingredientList);
        }
    }

    addRecord(ingredient) {
        ingredient["entityState"] = 1;//Added
        debugger;
        this.props.onAddIngredient();
        this.updateListState(ingredient);
    }

    removeRecord(ingredient) {
        ingredient["entityState"] = 3;//deleted
        this.updateListState(ingredient);
    }

    updateIngredientState(ingredient, event) {
        const field = event.target.name;
        ingredient[field] = event.target.value;

        this.updateListState(ingredient);
    }

    render() {
        let ingredients = [...this.state.ingredients];
        ingredients = _.filter(ingredients, function (x) { return x.entityState == undefined || x.entityState != 3; });//deleted
        if ((!this.props.limit || this.props.limit == 0) || ingredients.length < this.props.limit) {
            let canAddNew = !_.some(ingredients, { entityState: 0 });
            if (canAddNew) {
                ingredients.push({ id: this.getNewId(), name: "", amount: "", entityState: 0 });//none
            }
        }

        return (
            <div className="row">
                <h4 className="header">Ingredients</h4>
                {ingredients.map(ingredient =>
                    <RecipeIngredient
                        key={ingredient.id}
                        ingredient={ingredient}
                        onChange={this.updateIngredientState.bind(this, ingredient)}
                        onAddRecord={this.addRecord.bind(this, ingredient)}
                        onRemoveRecord={this.removeRecord.bind(this, ingredient)}
                        addState={ingredient.entityState == 0}/>
                )}
            </div>
        );
    }
}

RecipeIngredientList.propTypes = {
    ingredients: PropTypes.array.isRequired,
    errors: PropTypes.object,
    limit: PropTypes.number.isRequired,
    onUpdateIngredients: PropTypes.func.isRequired,
    onAddIngredient: PropTypes.func.isRequired
};


const mapStateToProps = (state, ownProps) => ({});

export default connect(mapStateToProps)(RecipeIngredientList);