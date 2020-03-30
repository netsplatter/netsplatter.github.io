import Loader from 'react-loader-spinner';
import React, { Component } from 'react';

export default class LoaderWr extends Component {
  render() {
    const { props } = this;
    const { className, type, color, height, width } = props;
    let attrs = {
      type: type || "Oval",
      color: color || "green",
      height: height || "40",
      width: width || "40"
    };
    return (
      <div className={`${className || 'loading'}`}>
        <Loader {...attrs} />
      </div>
    );
  }
}

export const LoaderContainer = ({children, className, style, loading}) => {
  return (
    <div className={`loading-container ${className || ''}`} style={style}>
      { loading ? <LoaderWr /> : null }
      { children }
    </div>
  )
};