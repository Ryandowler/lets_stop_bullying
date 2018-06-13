import React, { Component } from 'react';

class Section extends Component {

    constructor(props) {
        super(props);

        this.state = {
            "slug" : this.props.match.params.sectionid,
            "sections" : []
        }

    }

    componentDidMount() {
        const storage = localStorage.getItem('content');
        const language = localStorage.getItem('language');
        const storageJSON = JSON.parse(storage);

        const sec = storageJSON[0][language];

        console.log(sec);

        let arr = [];

        for (let i = 0; i < sec.sections.length; i++) {
            console.log(sec.sections[i].name);
            arr.push({
                name: sec.sections[i].name,
                slug: sec.sections[i].slug,
                image: sec.sections[i].image,
                colour: sec.sections[i].colour
            });
        }
        this.setState({
            sections: arr
        });

    }

    render() {

        const sections = this.state.sections.map(section => {
            return (
                <div className="card card-block col-md-6 section">
                    <div><a href={ section.slug } className="section-link">{section.name}</a></div>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row auto-clear" >
                    {sections}
                </div>
            </div>
        );
    }
}

export default Section;
