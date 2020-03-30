import React from "react";
import logoImg from '../img/logo.png';


const Block1 = () => (
    <div className="container-fluid block1">
        <div className="logo">
            <div>YouFeed</div>
            BEST SOCIAL CONTENT
            <img src={logoImg} alt=""/>
        </div>
        <div className="btn-container clearfix">
            <div className="btn btn-form"><a href="#">Связаться с нами</a></div>
            <div className="btn inverted"><a href="#">Скачать презентацию</a></div>
        </div>
        <div className="btn-slide"/>
    </div>
);

export default Block1;