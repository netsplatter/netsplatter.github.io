import React, { Component } from 'react';
import {getRandomInt} from '../Utils';
import {fetch as fetchPolyfill} from 'whatwg-fetch';
import videoBanner from '../video/wc_15secV1_0103_8.mp4';
import videoBannerMobile from '../video/wc_15secV1_0103_3.mp4';
import imgVideoPoster from '../img/ezgif.jpg';
import {
  FacebookShareButton,
  TwitterShareButton,
  VKShareButton,
  FacebookIcon,
  TwitterIcon,
  VKIcon
} from 'react-share';

export class TaskResults extends Component {
  state = {
    image: null
  };
  video = null;
  timeout = null;
  componentDidMount() {
    fetchPolyfill(`${process.env.HOST}/license`, {
      method: 'POST',
      body: JSON.stringify({
        firstname: this.props.name.firstname || '',
        lastname: this.props.name.lastname || ''
      })
    })
    .then(response => {
      const responseCopy = response.clone();
      return responseCopy.json()
        .then(body => ({body, response}))
        .catch(_ => response.text().then(text => ({text, response})));
    })
    .then(({body}) => {
      if (body && body.success && body.data) {
        this.setState({image: process.env.HOST + body.data.filename, result: body.data.codename, description: body.data.description});
      }
    })
    .catch(err => {
      console.log(err);
    });
    this.timeout = setTimeout(() => {
      if (this.video !== null) {
        this.video.play();
      }
    }, 5000);
  };
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  render() {
    const social = {
      url: `${process.env.HOST}/index/firstname/${encodeURIComponent(this.props.name.firstname) || ''}/lastname/${encodeURIComponent(this.props.name.lastname) || ''}/codename/${encodeURIComponent(this.state.result)}`,
      title: `Я спецагент ${this.state.result}. Узнай свой позывной здесь`
    };
    return (
      <div className="results">
        <h3>
          <span>Поздравляем!</span>
          Агент, ты отлично справился со всеми заданиями!
        </h3>
        <div className="header clearfix">
          <div>{this.props.name.firstname}</div>
          <div>-</div>
          <div>{this.state.result}</div>
          <div>{this.props.name.lastname}</div>
        </div>
        <div className="verdict">
          {this.state.description}
        </div>
        <div className="text">
          <div>Смотри сериал «Виски Кавалер»</div>
          <span>и узнай, как работают другие агенты</span>
          <a href="https://ya.cc/5PUbn" />
        </div>
        <img className="certificate" src={this.state.image}/>
        <h3>Показать удостоверение в соц. сетях</h3>
        <div className="s-links">
          <FacebookShareButton {...{...social, url: `${social.url}/from/fb`}}>
            <a href="javascript:void(0)" className="icon fb" />
          </FacebookShareButton>
          <VKShareButton {...{...social, url: `${social.url}/from/vk`}}>
            <a href="javascript:void(0)" className="icon vk" />
          </VKShareButton>
          <TwitterShareButton {...{...social, title: `${social.title}`, url: `${social.url}/from/tw`}}>
            <a href="javascript:void(0)" className="icon tw" />
          </TwitterShareButton>
        </div>
        <div className="banner-container">
          <div className="banner video">
            <video id="video_step6" src={window.innerWidth <= 500 ? videoBannerMobile : videoBanner} type="video/mp4" poster={imgVideoPoster} controls ref={e => this.video = e} playsInline preload="auto" />
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
      </div>
    );
  }
}