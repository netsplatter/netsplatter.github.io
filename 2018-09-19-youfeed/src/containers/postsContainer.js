import React from 'react';
import Posts from '../components/posts';

class PostsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            data: {
                "groups": [
                    {
                        "image": "",
                        "name": "",
                        "category": "",
                        "subs": 0,
                        "dateCreated": "",
                        "posts": [
                            {
                                "postImg": ""
                            }
                        ]
                    }
                ]
            }
        }
    }

    componentDidMount() {
        fetch('../src/sample_data.json')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        data: result,
                    });
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    render() {
        return <Posts data={this.state.data} />;
    }
}

export default PostsContainer;