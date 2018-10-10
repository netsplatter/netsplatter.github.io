import React from 'react';

const Stats = (props) => (

    <div className="stats clearfix">
        <div className="item">
            <div className="circle">
                <span>{props.data.groupsTotal}</span>
            </div>
            <span>ПЛОЩАДОК</span>
        </div>

        <div className="item">
            <div className="circle">
                <span>{props.data.subsTotal}</span>
                <span>млн</span>
            </div>
            <span>ПОДПИСЧИКОВ</span>
        </div>

        <div className="item">
            <div className="circle">
                <span>{props.data.coverageTotal}</span>
                <span>млн</span>
            </div>
            <span>СУТОЧНЫЙ ОХВАТ</span>
        </div>
    </div>
);

export default Stats;