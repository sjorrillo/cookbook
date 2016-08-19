import React, {PropTypes} from 'react';
import TextInput from '../common/controls/TextInput';
import TextArea from '../common/controls/TextArea';
import SelectInput from '../common/controls/SelectInput';
import RecipeIngredientList from './controls/RecipeIngredientList';

// <form>
//       <h3>Manage recipe</h3>
//       <TextInput
//         name="title"
//         label="Title"
//         value={recipe.title}
//         onChange={onChange}
//         error={errors.title}/>

//       <SelectInput
//         name="authorId"
//         label="Author"
//         value={recipe.authorId}
//         defaultOption="Select Author"
//         options={allAuthors}
//         onChange={onChange} error={errors.authorId}/>

//       <TextInput
//         name="category"
//         label="Category"
//         value={recipe.category}
//         onChange={onChange}
//         error={errors.category}/>

//       <TextInput
//         name="length"
//         label="Length"
//         value={recipe.length}
//         onChange={onChange}
//         error={errors.length}/>

//       <input
//         type="submit"
//         disabled={saving}
//         value={saving ? 'Saving...' : 'Save'}
//         className="btn btn-primary"
//         onClick={onSave}/>
//     </form>

const RecipeForm = ({recipe, categories, onSave, onChange, onAddIngredient, onRemoveRecord, onUpdateIngredient, saving, errors}) => {

  return (
    <div>
      <div className="card-panel">
        <h4 className="header">Manage Recipe</h4>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <TextInput
                name="name"
                label="Name"
                placeholder="Recipe Name"
                value={recipe.name}
                onChange={onChange}
                error={errors.name}
                wrapperClass="s12"/>
            </div>
            <div className="row">
              <SelectInput
                name="category"
                label="Category"
                value={recipe.category}
                defaultOption="Select Category"
                options={categories}
                onChange={onChange} error={errors.category}
                wrapperClass="s12"/>

            </div>
            <div className="row">
              <TextInput
                name="chef"
                label="Chef"
                placeholder="Chef"
                value={recipe.chef}
                onChange={onChange}
                error={errors.chef}
                wrapperClass="s12"/>
            </div>

            {recipe.ingredients && <RecipeIngredientList
              ingredients={recipe.ingredients} 
              onAddIngredient={onAddIngredient} 
              onRemoveRecord={onRemoveRecord}
              onUpdateIngredient={onUpdateIngredient}/>}

            <div className="row">
              <h5 className="header">Description of Preparation</h5>
              <TextArea
                name="preparation"
                label="Description of Preparation"
                placeholder="Oh WoW! Let me check this one too."
                value={recipe.preparation}
                onChange={onChange}
                error={errors.preparation}
                wrapperClass="s12"
                showLabel={false}/>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="submit"
                  name="saveButton"
                  disabled={saving}
                  value={saving ? 'Saving...' : 'Save'}
                  className="btn waves-effect waves-light right"
                  onClick={onSave}/>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

RecipeForm.propTypes = {
  recipe: PropTypes.object.isRequired,
  categories: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onAddIngredient: PropTypes.func.isRequired,
  onRemoveRecord: PropTypes.func.isRequired,
  onUpdateIngredient: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default RecipeForm;


