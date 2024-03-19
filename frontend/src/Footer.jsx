
const Footer = (props) => {

    const onInput = (event) => {
        //Call some method that appends the last input to the current messages
        //and then that method does a POST request to the backend (LLM)
    } 

    return (
        <div className="input-group chat-input">
            <textarea className="form-control" placeholder="Ask Any Question..." aria-label="With textarea"></textarea>
            <span id = "abc" className="input-group-text">
                <button className="btn btn-outline-secondary" type="button" id="button-addon2">
                    <span id="sendIcon">
                        <i className="bi bi-send-fill"></i>
                    </span>
                </button>
            </span>
        </div>
    )
}

export default Footer