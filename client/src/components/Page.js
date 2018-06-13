import React, { Component } from 'react';

class Page extends Component {

    constructor(props) {
        super(props);

        this.state = {
            "slug" : this.props.match.params.sectionid
        }

    }

    componentDidMount() {
        const content = localStorage.getItem('content');
        const language = localStorage.getItem('language');
        console.log(content);
        console.log(language);
    }

    render() {
        return (
            <div>
                <a onClick={this.props.history.goBack}>Back</a>
                <div>This is a page</div>
            </div>
        );
    }
}

export default Page;
