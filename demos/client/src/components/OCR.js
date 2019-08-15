import React, { Component } from 'react';
import './OCR.css';
import axios from 'axios';

class OCR extends Component {
    constructor(props) {
        super(props);
          this.state = {
            selectedFile: null,
            resultText: '',
            languageDetected: '',
            translatedText: '',
            loading: false
          }
       
      }
    onChangeHandler=event=>{
        this.setState({
            selectedFile: event.target.files[0],
            fileURL: URL.createObjectURL(event.target.files[0]),
            loaded: 0,
          });
    }
    onClickHandler = () => {
        this.setState({
            loading: true
        });
        const data = new FormData() ;
        data.append('file', this.state.selectedFile);
        axios.post("http://localhost:5001/upload", data, { // receive two parameter endpoint url ,form data 
            })
            .then(res => { // then print response status
                console.log(res.statusText);
                console.log(res.data.extracted_text);
                this.setState({
                    resultText: res.data.extracted_text,
                    languageDetected: res.data.language_detected,
                    translatedText: res.data.translated_text,
                    loading: false
                })
            })
    }

    renderResults() {
        if(this.state.loading) {
            // Show loading bar
            return(
            <div>
                Loading ...
            </div>);
        }else if(this.state.languageDetected) {
            return(
                <div id="ocr-results-div">
                    { this.state.resultText.split("\n").map((i,key) => {
                        return <div key={key}>{i}</div>;
                    })}
                    <br />
                    <br />
                    <b>Language detected</b>: {this.state.languageDetected}
                    <br />
                    <br />
                    <b>Translation</b>: {this.state.translatedText}
                </div>
            );
        }

    }

    render() {
        return(
            <div>
                <div className="center title-wrapper">
                <h1 className="title-text">
                    OCR Solutions
                </h1>
                <h2 className="product-description">
                    Extract useful insights from images containing textual information.
                </h2>
                <h2 className="title-text">
                    Try it out
                </h2>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <form method="post" action="#" id="#">
                            <div>
                                <h3 className="center">Upload Your File </h3>
                                <img src={this.state.fileURL} style={{maxHeight: "300px"}}></img>
                                <input className="center" type="file" multiple="" onChange={this.onChangeHandler} />
                            </div>
                        </form>
                        <button type="button" className="btn btn-primary btn-block" onClick={this.onClickHandler}>Upload</button> 
                    </div>
                    <div className="col-md-6">
                        { this.renderResults() }
                    </div>
                </div>
            </div>
        );
    }
}

export default OCR;