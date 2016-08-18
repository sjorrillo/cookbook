import React, {PropTypes} from 'react';

const RecipeFilter = ({title, filter, categories, onChange}) => {
  // <label htmlFor="category">Category Filter</label>
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
                          className="browser-default"
                          value={filter}
                          onChange={onChange}>
                          <option value="All">All</option>
                          {categories.map((category) => {
                            return <option key={category.id} value={category.name}>{category.name}</option>;
                          })
                          }
                      </select>
                      
                  </div>
              </div>
            </div>
          </div>
        </div>
    );
};

RecipeFilter.propTypes = {
    title: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};

export default RecipeFilter;