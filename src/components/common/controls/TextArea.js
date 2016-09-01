import React, {PropTypes} from 'react';

export const TextArea = ({name, label, onChange, placeholder, value, error, wrapperClass, showLabel = true}) => {
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  return (
    <div className={"input-field col " + wrapperClass}>
          <textarea
            name={name}
            className="materialize-textarea"
            placeholder={placeholder}
            value={value}
            onChange={onChange}/>
          {showLabel && <label htmlFor={name} className="active">{label}</label>}
          {error && <div className="error">{error}</div>}
     </div>
  );
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  wrapperClass: PropTypes.string,
  showLabel: PropTypes.bool
};