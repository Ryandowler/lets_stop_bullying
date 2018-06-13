import React, { Component } from 'react';
import "./Language.css";
import Spanish from '../images/spanish.png';
import Portuguese from '../images/portuguese.png';
import Italian from '../images/italian.png';
import English from '../images/english.png';
import { Link, withRouter, Redirect } from "react-router-dom";

class Language extends Component {

    constructor(){
        super();
        this.state = {
            navigate: false
        }
        this.onItemClick = this.onItemClick.bind(this);
    }
    onItemClick(lang) {
        console.log(lang);
        localStorage.setItem("language", lang);
        this.setState({
            navigate: true
        });
    }

    render() {

        if (this.state.navigate) {
          return <Redirect to="/home" push={true} />
        }

        return (
            <div className="container">
                <div className="row" align="center">
                    <h1 className="title">Please select your language:</h1>
                </div>
                <div className="row" align="center">
                    <div className="col-md-3">
                        <a onClick={() => this.onItemClick("en")}>
                            <img src={English} />
                            <p className="languageTitle">English</p>
                        </a>
                    </div>
                    <div className="col-md-3">
                        <a onClick={() => this.onItemClick("es")}>
                            <img src={Spanish} />
                            <p className="languageTitle">Spanish</p>
                        </a>
                    </div>
                    <div className="col-md-3">
                        <a onClick={() => this.onItemClick("pt")}>
                            <img src={Portuguese} />
                            <p className="languageTitle">Portuguese</p>
                        </a>
                    </div>
                    <div className="col-md-3">
                        <a onClick={() => this.onItemClick("it")}>
                            <img src={Italian} />
                            <p className="languageTitle">Italian</p>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
export default Language;
