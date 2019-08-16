import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Substance from './components/Substance';
import OCR from './components/OCR';
// get our fontawesome imports
// import { search } from "@fortawesome";

class App extends Component {
  
  render() {
    return (
        <div>
          <Router>
          <nav>
            <div id="nav-bar-wrapper">
              <img id="logo" src="/logo.png" alt="logo &amp;Data"/>
              <ul id="nav-bar-list">
                <li className="nav-bar-item">
                  <Link to="/">Substance</Link>
                </li>
                <li className="nav-bar-item">
                  <Link to="/ocr/">OCR</Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <Route path="/" exact component={Substance} />
            <Route path="/ocr/" component={OCR} />
          </div>
          </Router>
          <div style={{height: '100px'}}>

          </div>
        </div>
    );
  }
}
export default App;