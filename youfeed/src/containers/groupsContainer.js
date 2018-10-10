import React from 'react';
import Groups from '../components/groups';

class GroupsContainer extends React.Component {
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
                        "subs": 0
                    }
                ]
            }
        }
    }

    componentDidMount() {
        fetch("../src/sample_data.json")
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
        return <Groups data={this.state.data} />;
    }
}

export default GroupsContainer;