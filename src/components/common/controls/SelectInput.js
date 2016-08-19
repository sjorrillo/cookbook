import React, {PropTypes} from 'react';

const SelectInput = ({name, label, onChange, defaultOption, value, error, options, wrapperClass}) => {
   if (error && error.length > 0) {
     wrapperClass += " " + 'has-error';
   }
//className="browser-default"
  return (
    <div className={"input-field col " + wrapperClass}>
       <select
          name={name}
          value={value}
          
          onChange={onChange}>
          <option value="">{defaultOption}</option>
          {options.map((option) => {
            return <option key={option.value} value={option.value}>{option.text}</option>;
          })
          }
      </select>
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  wrapperClass: PropTypes.string
};

export default SelectInput;