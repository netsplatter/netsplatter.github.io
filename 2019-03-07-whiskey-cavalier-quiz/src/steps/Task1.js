import React, { Component } from 'react';
import classnames from 'classnames';

export class Task1 extends Component {
  state = {
    value: null
  };
  options = [
    "Я всегда работаю ОДИН",
    "Красивый НАПАРНИК ещё никому не помешал",
    "Главное - чтобы за спиной всегда была надёжная КОМАНДА"
  ];
  onChange = (value) => {
    this.setState({value});
    this.props.onChange({complete: true, value});
  };
  render() {
    return (
      <div className="task1">
        <h3>
          Начнём с простого, агент.
          <span>КАК ТЫ ПРИВЫК РАБОТАТЬ?</span>
        </h3>
        <ul>
          {this.options.map((v, i) => {
            const className = classnames('task1__item', {
              active: this.state.value === i
            });
            return (
              <li key={v} className={className} onClick={this.onChange.bind(this, i)}>
                <p>{v}</p>
                <span className="corner" />
                <span className="corner" />
                <span className="corner" />
                <span className="corner" />
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}