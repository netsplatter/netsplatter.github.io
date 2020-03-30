import React, { Component } from 'react';
import classnames from 'classnames';

export class Task4 extends Component {
  state = {
    value: null
  };
  options = [
    {answer: 'Виски в стакане', desc: 'Отвечу, что я в безопасности'},
    {answer: 'Нужно больше льда', desc: 'Нужно вызвать подкрепление'},
    {answer: 'Всего два глотка', desc: 'Напарник в опасности, я скоро буду'}
  ];
  next = () => {
    this.props.onChange({complete: true, value: this.state.value});
  };
  onChange = (value) => {
    this.setState({value});
  };
  render() {
    return (
      <>
        <div className="task4">
          <h3>Настоящий агент сразу разгадает шифр своего напарника.
            <span>Что ответишь?</span>
          </h3>
          <div className="task4__answer">Пельмени уже на пирсе</div>
          <div className="task4__answer">Зима - уткам пора</div>
          {this.state.value === null ? (
            <>
              <div className="clearfix">
                <div className="answer-indicator">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <ul>
                {this.options.map((v, i) => {
                  return (
                    <li key={i} className="task4__item" onClick={this.onChange.bind(this, i)}>
                      <p>{v.answer}</p>
                      <p>{v.desc}</p>
                      <span className="corner" />
                      <span className="corner" />
                      <span className="corner" />
                      <span className="corner" />
                    </li>
                  )
                })}
              </ul>
            </>
          ) : (
            <div className="task4__answer user">{this.options[this.state.value].answer}</div>
          )}
        </div>
        <button type="button" className="btn-next" disabled={this.state.value === null} onClick={this.next}>Далее</button>
      </>
    );
  }
}