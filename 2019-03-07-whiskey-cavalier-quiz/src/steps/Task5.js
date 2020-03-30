import React, { Component } from 'react';
import classnames from 'classnames';
import imgPerson1 from '../img/person1.png';
import imgPerson1_active from '../img/person1-active.png';
import imgPerson2 from '../img/person2.png';
import imgPerson2_active from '../img/person2-active.png';
import imgPerson3 from '../img/person3.png';
import imgPerson3_active from '../img/person3-active.png';
import imgPerson4 from '../img/person4.png';
import imgPerson4_active from '../img/person4-active.png';
import imgPerson5 from '../img/person5.png';
import imgPerson5_active from '../img/person5-active.png';

export class Task5 extends Component {
  state = {
    value: null
  };
  options = [
    {
      img: imgPerson1,
      imgActive: imgPerson1_active
    },
    {
      img: imgPerson2,
      imgActive: imgPerson2_active
    },
    {
      img: imgPerson3,
      imgActive: imgPerson3_active
    },
    {
      img: imgPerson4,
      imgActive: imgPerson4_active
    },
    {
      img: imgPerson5,
      imgActive: imgPerson5_active
    },
  ];
  onChange = (value) => {
    this.setState({value});
    this.props.onChange({complete: true, value});
  };
  render() {
    return (
      <div className="task5">
        <h3>Нет времени объяснять.<span>У тебя же глаз-алмаз - уверены, ты сразу сможешь найти преступника</span></h3>
        <div className="bars">
          <div className="unit" />
          <div className="unit" />
          <div className="unit" />
          <div className="unit" />
          <div className="unit" />
          <div className="unit" />
          <div className="unit" />
          <div className="unit" />
          {this.options.map((v, i) => {
            const className = classnames('task5__item', {
              active: this.state.value === i
            });
            return (
              <div key={i} className={className + " task5__item-" + (i + 1)} onClick={this.onChange.bind(this, i)}>
                <img src={v.img} alt=""/>
                <img className="extra" src={v.imgActive} alt=""/>
              </div>
            )
          })}
        </div>
        <div className="choice-panel">
          {this.options.map((z, j) => {
            const className = classnames('task5__panel__item', {
              active: this.state.value === j
            });
            return (
              <div key={j} className={className} onClick={this.onChange.bind(this, j)}>
                {j + 1}
                <span className="corner" />
                <span className="corner" />
                <span className="corner" />
                <span className="corner" />
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}