import React from 'react';
import pubListFile from '../files/Список Групп.xlsx';

const Groups = (props) => (
    <div>
        <div className="pub-list clearfix">

            {props.data.groups.map((item, i) =>

                <div className="item" key={i}>
                    <img src={item.image} alt=""/>
                    <h4><a href="#">{item.name}</a></h4>
                    <div>{item.category}</div>
                    <div>{item.subs} подписчиков</div>
                </div>
            )}
        </div>
        <div className="btn"><a href={pubListFile} download>СКАЧАТЬ ВЕСЬ СПИСОК ПАБЛИКОВ</a></div>
    </div>
);

export default Groups;