import React, { Component } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';
import {InputGroupWrapper} from '@components/common/InputGroup';

export class DatepickerCustom extends Component {
  get content() {
    const { props } = this;
    const { value, customPlaceholder, format } = props;
    if (!value) {
      return <div className="hate-custom__placeholder">{ customPlaceholder }</div>;
    }
    return <div className="datepicker-custom__value">{ format ? moment(value).format(format) : value }</div>;
  }
  render() {
    const {content, props} = this;
    const {invalid} = props;
    return (
      <InputGroupWrapper leftPosition wrapInput icon={<FontAwesomeIcon icon={faCalendarAlt} className="opacity-half" />} onClick={this.props.onClick} invalid={invalid}>
        { content }
      </InputGroupWrapper>
    )
  }
}

DatepickerCustom.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string
}