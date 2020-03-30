import React, { Component } from 'react';
import classNames from 'classnames';
import imgWh from '../img/wh.png';
import imgWh_m from '../img/wh-m.png';
import Animated from "animated/lib/targets/react-dom";
import videoBanner from '../video/wc_15secV2_0103_8.mp4';
import videoBannerMobile from '../video/wc_15secV2_0103_3.mp4';

export class StepName extends Component {
  constructor() {
    super();
    if (window.innerWidth <= 500) {
      this.left = 0;
      this.bottom = 250;
    } else if (window.innerWidth <= 1100) {
      this.left = 0;
      this.bottom = 250;
    }
    if (window.innerWidth > 1100) {
      this.left = 593;
      this.bottom = 292;
    }
      this.state = {
      value1: '',
      value2: '',
      validValue1: false,
      validValue2: false,
      submitted: false,
      dots: 0,
      maxDots: 20,
      left: new Animated.Value(this.left),
      bottom: new Animated.Value(this.bottom)
    };
  }
  dotsInterval = null;
  getAimParams = () => {
    let disabled = this.disabled();
    let bottom = disabled ? this.bottom : this.wrapper.offsetHeight - this.button.offsetTop - this.aim.refs.node.offsetHeight/2 - this.button.offsetHeight/2;
    let left = disabled ? this.left : this.button.offsetLeft + this.button.offsetWidth/2 - this.aim.refs.node.offsetWidth/2;
    if (!disabled && window.innerWidth <= 1100) {
      left = 0;
    }
    return {
      bottom,
      left
    };
  };
  onChange = (e) => {
    const { value, name } = e.target;
    let validKey = 'validValue1';
    if (name === 'value2') {
      validKey = 'validValue2';
    }
    const regExp = /^[А-Яа-яA-Za-z\-\s]+$/;
    const valid = regExp.test(value);
    this.setState({[name]: value, [validKey]: valid}, () => {
      if (!this.state.submitted) {
        this.state.left.stopAnimation(value => {
          this.state.bottom.stopAnimation(value => {
            const params = this.getAimParams();
            Animated.timing(this.state.left, {toValue: params.left}).start();
            Animated.timing(this.state.bottom, {toValue: params.bottom}).start();
          });
        });
      }
    });
  };
  disabled = () => {
    return !this.state.value1 || !this.state.value2 || !this.state.validValue1 || !this.state.validValue2;
  };
  onClick = (e) => {
    this.setState({submitted: true}, () => {
      setTimeout(() => {
        this.props.onChange({complete: true, firstname: this.state.value1, lastname: this.state.value2});
      }, 1500);
    });
  };
  setRef = (key, elm) => {
    this[key] = elm;
  };
  componentDidMount() {
    this.dotsInterval = setInterval(() => {
      let dots = this.state.dots > this.state.maxDots ? 1 : this.state.dots + 1;
      this.setState({dots});
    }, 700);
  }
  componentWillUnmount() {
    clearInterval(this.dotsInterval);
  }
  render() {
    const dots = Array.from({length: this.state.dots}).join('.');
    const classes1 = classNames("input-wrapper", "username", {success: this.state.submitted, danger: this.state.value1 && !this.state.validValue1});
    const classes2 = classNames("input-wrapper", "username", {success: this.state.submitted, danger: this.state.value2 && !this.state.validValue2});
    const classesCommon = classNames({success: this.state.submitted, danger: this.state.value2 && !this.state.validValue2 || this.state.value1 && !this.state.validValue1});
    return (
      <div className="wrapper" ref={this.setRef.bind(this, 'wrapper')}>
        <div className="header clearfix">
          <div>ПРОЙДИ ТЕСТ НА</div>
          <div>WHISKEY CAVALIER</div>
          <div>НАСТОЯЩЕГО СПЕЦАГЕНТА</div>
        </div>
        <h3>И ПОЛУЧИ СВОЕ УДОСТОВЕРЕНИЕ<div>С ЛИЧНЫМ ПОЗЫВНЫМ</div></h3>
        <div className={classes1}>
          {this.state.value1 && !this.state.validValue1 ? <div className="hint">Недопустимые символы</div> : null}
          <input type="text" name="value1" placeholder={`Имя${dots}`} value={this.state.value1} onChange={this.onChange}/>
          <span className="corner" />
          <span className="corner" />
          <span className="corner" />
          <span className="corner" />
        </div>
        <div className={classes2}>
          {this.state.value2 && !this.state.validValue2 ? <div className="hint">Недопустимые символы</div> : null}
          <input type="text" name="value2" placeholder={`Фамилия${dots}`} value={this.state.value2} onChange={this.onChange}/>
          <span className="corner" />
          <span className="corner" />
          <span className="corner" />
          <span className="corner" />
        </div>
        { this.state.submitted ? <div className="success-block">ACCESS GRANTED</div> : <button type="button" ref={this.setRef.bind(this, 'button')} className="btn-start" disabled={this.disabled()} onClick={this.onClick}>Пройти тест</button> }
        <div className={`fingerprint ${classesCommon}`} />
        <img src={imgWh} alt="" className="wh"/>
        <img src={imgWh_m} alt="" className="wh mobile"/>
        <div className="banner-container">
          <div className="banner video">
            <video src={window.innerWidth <= 500 ? videoBannerMobile : videoBanner} type="video/mp4" controls />
            <span className="corner" />
            <span className="corner" />
            <span className="corner" />
            <span className="corner" />
          </div>
        </div>
        <div className="panel clearfix">
          <div>Смотри сериал <span>&nbsp;«Виски Кавалер»&nbsp;</span> на</div>
          <div>
            КиноПоиске
          </div>
          <a href={process.env.TARGET_URL} target="_blank"/>
        </div>
        <Animated.div className={`aim ${classesCommon}`} style={{left: this.state.left, bottom: this.state.bottom}} ref={this.setRef.bind(this, 'aim')}>
          <div className="aim-inner" />
        </Animated.div>
      </div>
    );
  }
}