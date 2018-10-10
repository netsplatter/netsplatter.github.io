import React from 'react';
import {render} from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/slick.min.css';
import './css/main.css';
import './js/slick.min.js';
import './js/scripts.js';

import StatsContainer from './containers/statsContainer';
import GroupsContainer from './containers/groupsContainer';
import PostsContainer from './containers/postsContainer';
import FormContainer from './containers/formContainer';
import Block1 from './components/block1';
import Block4 from "./components/block4";
import InfoBlock from "./components/info_block";

render(<Block1 />, document.getElementById("block1"));
render(<FormContainer />, document.getElementById("form1"));
render(<StatsContainer />, document.getElementById("stats"));
render(<GroupsContainer />, document.getElementById("groups"));
render(<FormContainer />, document.getElementById("form2"));
render(<Block4 />, document.getElementById("block4"));
render(<FormContainer />, document.getElementById("form3"));
render(<PostsContainer />, document.getElementById("posts"));
render(<FormContainer />, document.getElementById("form4"));
render(<InfoBlock />, document.getElementById("info_block"));
render(<FormContainer />, document.getElementById("form5"));





