import React, {Component} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import HighlightedText from './HighlightedText';
import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://127.0.0.1:5000");

class Substance extends Component {
    constructor() {
        super();
        this.state = {
          text: '',
          annotations: [],
          searchFor: ''
        };
      }
    
      componentDidMount() {
        socket.on("found_entities", (data) => {
            this.setState({ annotations: data.tokens }, () => {
              console.log(this.state.annotations);
            });
        });
      }
    
      handleTextChange(event) {
        this.setState({text: event.target.value});
      }
    
      handleSearchChange(event) {
        this.setState({searchFor: event.target.value})
      }
    
      handleSubmit(event) {
        console.log('handleSubmit');
        socket.emit('find_entities', {text: this.state.text, searchItems: this.state.searchFor});
      }
    
    render() {
        return(
        <div>
            <div className="center title-wrapper">
              <h1 className="title-text">
                Substance
              </h1>
              <h2 className="product-description">
                Describe large digital collections quickly and efficiently using Substance, an intelligent entity extractor.
              </h2>
              <h2 className="title-text">
                Our Offerings
              </h2>
              <div className="legend-container">
                <span className="PERSON">People</span> &nbsp; 
                <span className="GPE">Locations</span> &nbsp;
                <span className="ORG">Organizations</span> &nbsp; 
                <span className="DATE">Dates</span> &nbsp; 
                <span className="TIME">Times</span> &nbsp; 
                <span className="MONEY">Money</span>  
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <textarea id="input-text-area" className="center" value={this.state.text} onChange={this.handleTextChange.bind(this)}/>
              </div>
              <div className="col-md-6">
                <div id="search-box-wrapper" className="center">
                    <input type="text" value={this.state.searchFor} onChange={this.handleSearchChange.bind(this)}/>
                    <button type="submit" onClick={this.handleSubmit.bind(this)}>
                      <FontAwesomeIcon icon={ faSearch } color=" #ff267c"/>
                    </button>
                </div>
                <HighlightedText annotations = {this.state.annotations} />
                </div>
            </div>
        </div>);
    }
}

export default Substance;