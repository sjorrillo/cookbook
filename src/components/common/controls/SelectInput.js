import React, {PropTypes} from 'react';

export class SelectInput extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    defaultOption: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    error: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    wrapperClass: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.selectInput = this.refs[this.props.name];
    this.applyBehaviours();
  }

  componentWillUnmount() {
    delete this.selectInput;
  }

  applyBehaviours() {
    $(this.selectInput).material_select(this.handleOnchange.bind(this));
  }

  handleOnchange() {
    const event = {
      target: {
        name: this.props.name,
        value: this.selectInput.value
      }
    };
    
    this.props.onChange(event);
  }

  render() {
    const {name, label, onChange, defaultOption, value, options} = this.props;
    let {error, wrapperClass} = this.props;
    if (error && error.length > 0) {
      wrapperClass += " " + 'has-error';
    }

    return (
      <div className={"input-field col " + wrapperClass}>
        <select
          name={name}
          value={value}
          ref={name}
          onChange={this.handleOnchange}>
          <option value="">{defaultOption}</option>
          {options.map((option) => {
            return <option key={option.value} value={option.value}>{option.text}</option>;
          })
          }
        </select>
        <label htmlFor={name}>{label}</label>
        <div className="error">{error}</div>
      </div>
    );
  }
}