import React, { Component } from 'react';
import classnames from 'classnames';
import imgHandcuffs from '../img/handcuffs.png';
import imgTalkie from '../img/talkie.png';
import imgSunglasses from '../img/sunglasses.png';
import imgPistol from '../img/pistol.png';
import imgHat from '../img/hat.png';
import imgBinoculars from '../img/binoculars.png';
import imgBulletproof from '../img/bulletproof.png';
import imgBottle from '../img/bottle.png';

export class Task2 extends Component {
  state = {
    values: [
      {name: "Наручники", img: imgHandcuffs, selected: false},
      {name: "Рация", img: imgTalkie, selected: false},
      {name: "Очки", img: imgSunglasses, selected: false},
      {name: "Пистолет", img: imgPistol, selected: false},
      {name: "Кепка", img: imgHat, selected: false},
      {name: "Бинокль", img: imgBinoculars, selected: false},
      {name: "Бронежилет", img: imgBulletproof, selected: false},
      {name: "Виски", img: imgBottle, selected: false}
    ]
  };
  onChange = (index) => {
    let values = this.state.values;
    values[index].selected = !values[index].selected;
    this.setState({values});
    let selected = values.filter(v => v.selected).length;
    this.props.onChange({complete: selected === 2, value: values});
  };
  render() {
    return (
      <div className="task2">
        <h3>
          Вечером важное задание:
          <span>ВЫБЕРИ ДВЕ ВЕЩИ, КОТОРЫЕ ВОЗЬМЕШЬ С СОБОЙ</span>
        </h3>
        <ul>
          {this.state.values.map((v, i) => {
            const className = classnames('task2__item', {
              active: v.selected
            });
            return (
              <li key={i} className={className} onClick={this.onChange.bind(this, i)}>
                <img src={v.img} alt=""/>
                <p>{v.name}</p>
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