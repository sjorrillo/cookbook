import React, {PropTypes} from 'react';

export const RecipeFilter = ({title, filter, categories, onChange}) => {
    return (
        <div className="grey lighten-5">
          <div className="row valign-wrapper head-title">
            <div className="col s6">
              <h4 className="header">{title}</h4> 
            </div>
            <div className="col s6 ">
              <div className="grey-text right-align">
                   <div className="input-field col s12">
                       <select
                          name="category"
                          value={filter}
                          onChange={onChange}>
                          <option value="0">All</option>
                          {categories.map((category) => {
                            return <option key={category.id} value={category.id}>{category.name}</option>;
                          })
                          }
                      </select>
                      <label htmlFor="category">Category Filter</label>
                  </div>
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