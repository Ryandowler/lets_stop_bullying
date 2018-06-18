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

    checkIsThere(arr) {

        let sectionContent;
        let found = false;

        if (arr.sections) {
            for (let i = 0; i < arr.sections.length; i++) {
                if (arr.sections[i].slug === this.state.slug) {
                    sectionContent = {
                        name: arr.sections[i].name,
                        slug: arr.sections[i].slug,
                        image: arr.sections[i].image,
                        colour: arr.sections[i].colour,
                        pages: arr.sections[i].pages
                    }
                    found = true;
                }
            }
        }

        if (found) {
            this.setState({
                content: sectionContent
            });
        }

    }

    componentDidMount() {
        const storage = localStorage.getItem('content');
        const language = localStorage.getItem('language');
        const storageJSON = JSON.parse(storage);

        const sec = storageJSON[0][language];

        let isInLanguage = this.checkIsThere(sec);
        if (!isInLanguage) {
            this.checkIsThere(storageJSON[0]["en"]);
        }

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
