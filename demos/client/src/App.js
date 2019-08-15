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
            <ul>
              <li>
                <Link to="/">Substance</Link>
              </li>
              <li>
                <Link to="/ocr/">Language Detection and OCR</Link>
              </li>
            </ul>
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