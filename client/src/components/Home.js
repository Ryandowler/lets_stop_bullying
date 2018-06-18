import React, { Component } from 'react';
import { Link, withRouter, Redirect } from "react-router-dom";


class Home extends Component {

  constructor() {
      super();
      this.state = {
          navigate: false,
          content: [],
          link: "",
          language: ""
      }
      this.onSectionClick = this.onSectionClick.bind(this);
  }

  // Fetch content after first mount
  componentDidMount() {
    this.getContent();

  }

  getContent = () => {
    // Get the content and store them in state
    fetch('/api/content')
      .then(res => res.json())
      .then(result => this.onSetResult(result));
  }

  onSectionClick(slug) {
      this.setState({
          navigate: true,
          link: slug
      });
  }

  onSetResult = (result) => {
      localStorage.setItem("content", JSON.stringify(result));
      let lang = localStorage.getItem("language");
      this.setState({ content: result,
                      language: lang
      });


  }

  render() {
    const { content } = this.state;
    let sections = [];
    if (content[0]) {
        let language = this.state.language;

        let arr = content[0][language].sections;
        if (!arr) {
            arr = content[0]["en"].sections;
        }
        sections = arr.map(section => {
            return <div class="col-md-6 gap" onClick={() => this.onSectionClick(section.slug)}>
                        <div class="section">
                            <div class="section-content">
                                <img src={"/images/" + section.image} height="125px" width="auto" />
                                <p class="section-title">{section.name}</p>
                            </div>
                        </div>
                </div>;
        });
    }

    if (this.state.navigate) {
      return <Redirect to={"/sections/" + this.state.link} push={true} />
    }

    return (
        <div class="container">
            <div class="row auto-clear">{sections}</div>
        </div>
    );
  }
}

export default Home;
