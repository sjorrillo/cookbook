import React, {PropTypes} from 'react';

export const TextInput = ({name, label, onChange, placeholder, value, error, wrapperClass, prefixIcon = ""}) => {
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  return (
    <div className={"input-field col " + wrapperClass}>
      {prefixIcon != "" && <i className="material-icons prefix">{prefixIcon}</i>}
      <input
        type="text"
        name={name}
        className="validate"
        placeholder={placeholder}
        value={value}
        onChange={onChange}/>
      <label htmlFor={name} className="active">{label}</label>
      <div className="error">{error}</div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  wrapperClass: PropTypes.string,
  prefixIcon: PropTypes.string
};