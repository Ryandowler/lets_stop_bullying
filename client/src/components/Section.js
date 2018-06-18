import React, { Component } from 'react';
import { Link, withRouter, Redirect } from "react-router-dom";

class Section extends Component {

    constructor(props) {
        super(props);

        this.state = {
            "slug" : this.props.match.params.sectionid,
            "sections" : [],
            "content" : {},
            "navigate" : false,
            "nextPage": ""
        }
        this.onPageClick = this.onPageClick.bind(this);

    }

    componentDidMount() {
        const storage = localStorage.getItem('content');
        const language = localStorage.getItem('language');
        const storageJSON = JSON.parse(storage);

        const sec = storageJSON[0][language];

        let sectionContent;

        for (let i = 0; i < sec.sections.length; i++) {
            if (sec.sections[i].slug === this.state.slug) {
                sectionContent = {
                    name: sec.sections[i].name,
                    slug: sec.sections[i].slug,
                    image: sec.sections[i].image,
                    colour: sec.sections[i].colour,
                    pages: sec.sections[i].pages
                }
            }
        }

        this.setState({
            content: sectionContent
        });


    }

    onPageClick(name) {
        this.setState({
            navigate: true,
            nextPage: name
        })
    }

    render() {

        if (this.state.navigate) {
            return <Redirect to={"/sections/" + this.state.slug + "/" + this.state.nextPage} push={true} />
        }

        let pages;
        if (this.state.content.pages) {
            pages = this.state.content.pages.map(page => {
                return <p onClick={() => this.onPageClick(page.name)}>{page.name}</p>;
            });
        }

        return (
            <div className="container">
                <p><a onClick={this.props.history.goBack}>Back</a></p>
                <h1>{this.state.content.name}</h1>
                {pages}
            </div>
        );
    }
}

export default Section;
