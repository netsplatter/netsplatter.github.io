import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const Posts = (props) => (

    <Tabs className="wrapper clearfix">

        <h2>примеры постов <span className="text-pink">наших групп</span></h2>
        <div className="sidebar">
            <TabList className="sidebar-shortcuts">
                {props.data.groups.map((item, i) =>
                    <Tab className="item clearfix" key={i}>
                        <img src={item.image} alt=""/>
                        <h4><a href="javascript:;">{item.name}</a></h4>
                        <div>{item.category}</div>
                        <div>{item.subs} подписчиков</div>
                    </Tab>
                )}
            </TabList>
        </div>

        {props.data.groups.map((item, i) =>
            <TabPanel className="publics-container" key={i}>
                {item.posts.map((post, j) =>
                    <div className="public" key={j}>
                        <div className="content-block">
                            <div className="heading clearfix">
                                <div className="pub-logo">
                                    <img src={item.image} alt=""/>
                                </div>
                                <div className="pull-left">
                                    <h3>{item.name}</h3>
                                    <div className="date">{item.dateCreated}</div>
                                </div>
                            </div>
                            <div className="content">
                                <img src={post.postImg} alt=""/>
                            </div>
                            <div className="footer">
                                <div className="info-panel clearfix">
                                    <div className="icon like"><span>Нравится</span> 363</div>
                                    <div className="icon comment"><span>Комментарии</span> 24</div>
                                    <div className="icon repost"><span>Репосты</span> 1</div>
                                    <div className="icon watched">11 K</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </TabPanel>
        )}
    </Tabs>
);

export default Posts;