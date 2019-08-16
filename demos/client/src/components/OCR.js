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
            errorMessage: '',
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
        axios.post("http://104.211.9.147:5001/tamil_ocr/upload", data, { // receive two parameter endpoint url ,form data 
            })
            .then(res => { // then print response status
                console.log(res.statusText);
                console.log(res.data.extracted_text);
                this.setState({
                    resultText: res.data.extracted_text,
                    languageDetected: res.data.language_detected,
                    translatedText: res.data.translated_text,
                    loading: false,
                    error: false
                })
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    errorMessage: "Unfortunately an error has occured, please try again",
                    loading: false,
                    error: true
                })
            });
    }

    renderResults() {
        if(this.state.loading) {
            // Show loading bar
            return(
            <div>
                Loading ...
            </div>);
        }else if(this.state.error){
            return(
                <div id="error-message">
                    {this.state.errorMessage}
                </div>
            );
        }
        else if( !this.state.translatedText ){
            return(<div>

            </div>);
        }else if(this.state.translatedText[0] != [""]) {
            console.log(this.state.translatedText);
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
        }else{
            return(
                <div id="ocr-results-div">
                    No text found in image
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
                                { this.state.selectedFile ? 
                                    (<img id="preview-image" src={this.state.fileURL} style={{maxHeight: "300px", maxWidth: "100%"}} alt="preview" />) 
                                    : 
                                    ("") }
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