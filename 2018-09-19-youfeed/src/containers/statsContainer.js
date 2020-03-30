import React from 'react';
import Stats from '../components/stats';

class StatsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            data: {
                "stats": {
                    "groupsTotal": 0,
                    "subsTotal": 0,
                    "coverageTotal": 0
                },
            }
        }
    }

    componentDidMount() {
        fetch("../src/sample_data.json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        data: result
                    });
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    render() {
        return <Stats data={this.state.data.stats} />;
    }
}

export default StatsContainer;