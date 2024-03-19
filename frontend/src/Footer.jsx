import React, { useState } from 'react';


const Footer = (props) => {

    const [input, setInput] = useState(''); //Holds whatever the current text is in the text area

    const wasEnterPushed = (event) => {
        if(event.keyCode === 13){
            send();
        }
        //Call some method that appends the last input to the current messages
        //and then that method does a POST request to the backend (LLM)
    } 

    const send = () => {
        props.newInput(input);
        props.sendMessage();
    }

    return (
        <div className="input-group chat-input">
            <textarea onChange={(event) => setInput(event.target.value)} onKeyDown={wasEnterPushed} className="form-control" placeholder="Ask Any Question..." aria-label="With textarea"></textarea>
            <span id = "abc" className="input-group-text">
                <button onClick={send} className="btn btn-outline-secondary" type="button" id="button-addon2">
                    <span id="sendIcon">
                        <i className="bi bi-send-fill"></i>
                    </span>
                </button>
            </span>
        </div>
    )
}

export default Footer