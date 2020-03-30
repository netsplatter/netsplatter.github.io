import React from "react";
import paletteImg from '../img/palette.png';
import brainImg from '../img/brain.png';
import letterImg from '../img/love-letter.png';

const Block4 = () => (
    <div className="wrapper">
        <div className="features-item">
            <img src={paletteImg} alt=""/>
                <p>собственное производство <span className="text-pink">уникального контента</span></p>
        </div>
        <div className="features-item">
            <img src={brainImg} alt=""/>
                <p>линейка самых <span className="text-pink">популярных тематик аудитории</span></p>
        </div>
        <div className="features-item">
            <img src={letterImg} alt=""/>
                <p><span className="text-pink">вовлеченная аудитория,</span> которая любит наш контент</p>
        </div>
    </div>
);

export default Block4;