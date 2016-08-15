import React, {PropTypes} from 'react';
import TextInput from '../common/controls/TextInput';
import SelectInput from '../common/controls/SelectInput';

const ReceipeForm = ({receipe, allAuthors, onSave, onChange, saving, errors}) => {
  return (
     <form>
      <h3>Manage Receipe</h3>
      <TextInput
        name="title"
        label="Title"
        value={receipe.title}
        onChange={onChange}
        error={errors.title}/>

      <SelectInput
        name="authorId"
        label="Author"
        value={receipe.authorId}
        defaultOption="Select Author"
        options={allAuthors}
        onChange={onChange} error={errors.authorId}/>

      <TextInput
        name="category"
        label="Category"
        value={receipe.category}
        onChange={onChange}
        error={errors.category}/>

      <TextInput
        name="length"
        label="Length"
        value={receipe.length}
        onChange={onChange}
        error={errors.length}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

ReceipeForm.propTypes = {
  receipe: PropTypes.object.isRequired,
  allAuthors: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default ReceipeForm;


   