import React, { Component } from 'react';
import {getRandomInt} from '../Utils';

export class Task3 extends Component {
  interval = null;
  timeout = null;
  state = {
    value: null,
    step: 'init',
    time: 0
  };
  constructor() {
    super();
    if (window.innerWidth <= 500) {
      this.targetLeft = getRandomInt(0, window.innerWidth - 61);
    } else {
      this.targetLeft = getRandomInt(0, 375);
    }
    this.targetTop = getRandomInt(0, 300);
  }
  get step() {
    let component = null;
    switch (this.state.step) {
      case 'init':
        component = <button className="btn-ready" onClick={this.onStart}/>;
        break;
      case 'time-timeout':
        component = (
          <h3 className="action centered">
            <span>Приготовься...</span>
          </h3>
        );
        break;
      case 'time':
        component = (
          <div>
            <h3 className="action">
              <span>Стреляй!</span>
              {this.time} сек
            </h3>
            <div className="target-container">
              <div className="target" style={{left: this.targetLeft, top: this.targetTop}} onClick={this.onStop}/>
            </div>
          </div>
        );
        break;
      case 'result':
        component = (
          <div className="result">
            <h3>А ты хорош...</h3>
            <div>Твой результат</div>
            <div>{this.time} сек</div>
          </div>
        );
        break;
    }
    return component;
  }
  get time () {
    let time = this.state.time;
    return (time/1000).toFixed(2);
  };
  next = () => {
    this.props.onChange({complete: true, value: this.state.time});
  };
  onStart = () => {
    this.setState({step: 'time-timeout'}, () => {
      this.props.onAction();
      this.timeout = setTimeout(() => {
        this.setState({step: 'time'}, () => {
          this.interval = setInterval(() => {
            this.setState({time: this.state.time + 10})
          }, 10);
        });
      }, getRandomInt(500, 3000));
    });
  };
  onStop = () => {
    clearInterval(this.interval);
    this.setState({step: 'result'});
  };
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div className="task3">
        {this.state.step === 'init' ? (
          <h3>
            Проверим твою реакцию, ковбой.
            <span>
                Жми «готов», проверим,
                насколько быстро ты
                сможешь достать пистолет
                в сложной ситуации
              </span>
          </h3>
        ) : null}
        {this.step}
        <button type="button" className={"btn-next" + (this.state.step === 'init' ? " d-none" : "")} disabled={this.state.step !== 'result'} onClick={this.next}>Далее</button>
      </div>
    );
  }
}