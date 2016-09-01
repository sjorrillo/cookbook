import React, {PropTypes} from 'react';
import { SelectInput } from '../../common/controls/SelectInput';

export const RecipeFilter = ({title, filter, categories, onChange}) => {
    return (
        <div className="grey lighten-5">
          <div className="row valign-wrapper head-title">
            <div className="col s6">
              <h4 className="header">{title}</h4> 
            </div>
            <div className="col s6 ">
              <div className="grey-text right-align">
                  <SelectInput
                          name="category"
                          label="Category Filter"
                          value={filter}
                          defaultOption="Select Category"
                          options={categories}
                          onChange={onChange}
                          wrapperClass="s12"/>
              </div>
            </div>
          </div>
        </div>
    );
};

RecipeFilter.propTypes = {
    title: PropTypes.string.isRequired,
    filter: PropTypes.number.isRequired,
    categories: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};