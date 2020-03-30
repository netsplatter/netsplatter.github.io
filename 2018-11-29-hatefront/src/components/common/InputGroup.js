import React, { Component } from 'react';
import classnames from 'classnames';

export class InputGroup extends Component {
  constructor(props) {
    super(props);
    const { value } = props;
    this.state = {
      value: typeof value === 'undefined' ? '' : value,
      dirty: false
    };
  }
  componentWillReceiveProps(props) {
    const { value } = props;
    this.setState({value: typeof value === 'undefined' ? '' : value});
  }
  onInputChange(e) {
    const { props } = this;
    const { onChange } = props;
    this.setState({value: e.target.value, dirty: true});
    onChange && onChange(e.target.value);
  }
  onInputSubmit() {
    const { props, state } = this;
    const { onSubmit } = props;
    const { value } = state;
    onSubmit && onSubmit(value);
  }
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.onInputSubmit();
    }
  }
  render() {
    const { props, state, onInputChange, onInputSubmit, handleKeyPress } = this;
    const { value, dirty } = state;
    const { type, icon, placeholder, className, submitted, required, min, readOnly, leftPosition, onClick } = props;
    const onlySubmit = typeof submitted === 'undefined';
    const invalidRequired = required && !value.length && dirty;
    const invalid = invalidRequired && submitted || invalidRequired && onlySubmit;
    const attrs = {
      type: type || 'text',
      value,
      onKeyPress: handleKeyPress.bind(this),
      onChange: onInputChange.bind(this),
      onClick: onClick,
      className: `form-control ${invalid ? 'is-invalid' : ''}`,
      placeholder: placeholder || '',
      readOnly: readOnly || false
    };
    if (typeof min !== 'undefined') {
      attrs.min = min;
    }
    return (
      <InputGroupWrapper className={className} leftPosition={leftPosition} icon={icon} onSubmit={(e) => onInputSubmit.bind(this, e)}>
        <input {...attrs} />
      </InputGroupWrapper>
    );
  }
}

export default class InputGroupFormik extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.input.value = this.props.value || '';
  }
  onInputSubmit = (e) => {
    const { props } = this;
    const { onSubmit } = props;
    onSubmit && onSubmit(e, this.input.value);
  };
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.onInputSubmit(e);
    }
  }
  render() {
    const { props, onInputSubmit, handleKeyPress } = this;
    const { type, icon, placeholder, className, invalid, min, readOnly, leftPosition, onClick, onChange, onBlur, name } = props;
    const classes = classnames(
      'form-control',
      {
        'is-invalid': !!invalid,
      },
      className
    );
    const attrs = {
      type: type || 'text',
      name,
      onKeyPress: handleKeyPress.bind(this),
      onChange,
      onClick,
      onBlur,
      className: classes,
      placeholder: placeholder || '',
      readOnly: readOnly || false,
      ref: (el) => {
        this.input = el;
      }
    };
    if (typeof min !== 'undefined') {
      attrs.min = min;
    }
    return (
      <InputGroupWrapper className={className} leftPosition={leftPosition} icon={icon} onSubmit={onInputSubmit}>
        <input {...attrs} />
      </InputGroupWrapper>
    );
  }
}

export const InputGroupWrapper = ({leftPosition, onClick, icon, children, className, wrapInput, onSubmit, invalid}) => {

  const outerClasses = classnames(
    'input-group',
    {
      'input-group--left': leftPosition,
    },
    {
      'input-group--is-invalid': invalid,
    },
    className
  );
  const innerClasses = classnames(
    'input-group__input',
    {
      'input-group__input--wrapper': wrapInput,
    }
  );

  return (
    <div className={outerClasses} onClick={onClick}>
      <div className="input-group__icon" onClick={onSubmit}>
        {icon}
      </div>
      <div className={innerClasses}>
        {children}
      </div>
    </div>
  )
};