import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faCircle } from '@fortawesome/free-solid-svg-icons';

const CardBox = ({heading, subheading, headingAction, children, className, onBack}) => {

  const getHeading = () => {
    if (!heading) {
      return null;
    }
    return <div className="card__header--h">{heading}</div>
  };

  const getSubHeading = () => {
    if (!subheading) {
      return null;
    }
    return <div className="card__header--sub">({subheading})</div>
  };

  const getHeadingAction = () => {
    if (!headingAction) {
      return null;
    }
    return (
      <div className="card__header--action">
        { headingAction }
      </div>
    );
  };

  const getBack = () => {
    if (!onBack) {
      return null;
    }
    return (
      <div className="card__header--back">
        <span className="fa-layers fa-fw" onClick={onBack}>
          <FontAwesomeIcon icon={faCircle} color="#4E80BB" />
          <FontAwesomeIcon icon={faAngleLeft} size="xs" />
        </span>
      </div>
    );
  };

  return (
    <div className={`card ${className || ''}`}>
      { heading ?
      <div className="card__header">
        <div className="card__header--box">
          {getBack()}
          {getHeading()}
          {getSubHeading()}
        </div>
        {getHeadingAction()}
      </div> : null}
      <div className="card__body">
        {children}
      </div>
    </div>
  )
};

export default CardBox;