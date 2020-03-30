import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import {StepName} from './steps/Name';
import {Task1} from './steps/Task1';
import {Task2} from './steps/Task2';
import {Task3} from './steps/Task3';
import {Task4} from './steps/Task4';
import {Task5} from './steps/Task5';
import {TaskResults} from './steps/Results';
import classNames from 'classnames';
import {fetch as fetchPolyfill} from 'whatwg-fetch';
import {getRandomInt} from './Utils';

import './styles/main.scss';

class TaskProgress extends Component {
  render() {
    return (
      <div className="task-progress">
        {Array.from({length: 5}).map((v, i) => {
          const classes = classNames("task-progress__item", {active: i + 1 <= this.props.step});
          return (
            <div key={i} className={classes}/>
          );
        })}
      </div>
    )
  }
}

class App extends Component {

  state = {
    currentStep: 0,
    tasks: [
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ],
    action: false
  };

  get step() {
    let component = null;
    switch (this.state.currentStep) {
      case 0:
        component = <StepName onChange={this.stepChange.bind(this, 0)} />;
        break;
      case 1:
        component = <Task1 onChange={this.stepChange.bind(this, 1)} />;
        break;
      case 2:
        component = <Task2 onChange={this.stepChange.bind(this, 2)} />;
        break;
      case 3:
        component = <Task3 onChange={this.stepChange.bind(this, 3)} onAction={() => this.setState({action: true})} />;
        break;
      case 4:
        component = <Task4 onChange={this.stepChange.bind(this, 4)} />;
        break;
      case 5:
        component = <Task5 onChange={this.stepChange.bind(this, 5)} />;
        break;
      case 6:
        component = <TaskResults name={this.state.tasks[0]} />;
        break;
    }
    return component;
  };

  stepChange = (step, value) => {
    let {tasks} = this.state;
    tasks[step] = value;
    this.setState({tasks, action: false}, () => {
      if ([0, 3, 4].indexOf(step) > -1) {
        this.next();
      }
    });
  };

  next = () => {
    this.setState({currentStep: this.state.currentStep + 1});
  };

  render() {
    return (
      <div className={`main-container step-${this.state.currentStep} ${this.state.action ? 'action' : ''}`}>
        <div className="container">

          {[0, 6].indexOf(this.state.currentStep) === -1 ? <TaskProgress step={this.state.currentStep} /> : null}
          {this.step}

          {[0, 3, 4, 6].indexOf(this.state.currentStep) === -1 ? <button disabled={!this.state.tasks[this.state.currentStep].complete} type="button" className="btn-next" onClick={this.next}>Далее</button> : null}
        </div>
      </div>
    );
  }

}

const hotApp = process.env.NODE_ENV !== 'production' ? hot(module)(App) : App;

export default hotApp;