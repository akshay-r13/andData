import React, { Component } from 'react';
import'./HighlightedText.css';

class HighlightedText extends Component {
    annotateText(annotations){
        // console.log(element);
        return annotations.map(element => {
            if (element.entity_type === ""){
                return " " + element.token + " ";
            }
            return <span className={element.entity_type}> {element.token} </span>
        });
    }
    render(){
        return(
            <div id="highlighted-text-output">
                { this.annotateText(this.props.annotations) }
            </div>
        );
    }
}

export default HighlightedText;