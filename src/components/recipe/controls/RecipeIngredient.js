import React, {PropTypes} from 'react';
import TextInput from '../../common/controls/TextInput';

const RecipeIngredient = ({ingredient, onChange, onAddRecord, onRemoveRecord, errors, addState = true}) => {
    return (
        <div className="row">
             <TextInput
                name="name"
                label="Ingredient"
                prefixIcon="input"
                value={ingredient.name}
                onChange={onChange}
                wrapperClass="s5"/>
             <TextInput
                name="amount"
                label="Amount"
                prefixIcon="speaker_notes"
                value={ingredient.amount}
                onChange={onChange}
                wrapperClass="s5"/>
            <div className="input-field col s2">
                <div className="input-field col s12">
                    {addState && <a className="btn-floating waves-effect waves-light teal lighten-1" onClick={onAddRecord}><i className="material-icons">add</i></a>}
                    {!addState && <a className="btn-floating waves-effect waves-light red" onClick={onRemoveRecord}><i className="material-icons">remove</i></a>}
                </div>
            </div>
        </div>
    );
};

RecipeIngredient.propTypes = {
    ingredient: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onAddRecord: PropTypes.func.isRequired,
    onRemoveRecord: PropTypes.func.isRequired,
    errors: PropTypes.object,
    addState: PropTypes.bool
};

export default RecipeIngredient;