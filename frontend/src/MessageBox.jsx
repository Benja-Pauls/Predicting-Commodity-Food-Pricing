/*
This jsx file creates a message bubble for each message that has occured in the chat
*/

const MessageBox = (props) => {
    const message = props.message;
    let user;
    let img;
    let msgClassName;

    if(props.user === "person"){
        if (props.same_user) {
            msgClassName = "msg sent";
            return (
                <span>
                    <div className={msgClassName} style={{marginRight: '55px'}}>{message}</div>
                </span>
            )
        } else {
            user = "User";
            img = './person_profile.png'; //Insert image path here
            msgClassName = "msg sent";
            return (
                <span>
                    <div data-time={user} className={msgClassName}>{message}</div>
                    <img className="profileImageSent" src = {img} alt="pofile" style={{ width: "45px", height: "100%" }}/>
                </span>
            )
        }
    } else {
        if (props.same_user) {
            msgClassName = "msg rcvd";
            return (
                <span>
                    <div className={msgClassName} style={{marginLeft: '55px'}}>{message}</div>
                </span>
            )
        } else {
            user = "NourishNet"
            img = './FAO_logo.png'; //Interset image path here
            msgClassName = "msg rcvd"
            return (
                <span>
                    <img className="profileImageRcvd" src = {img} alt="pofile" style={{ width: "45px", height: "100%" }}/>
                    <div data-time={user} className={msgClassName}>{message}</div>
                </span>
            )
        }
    }

    
            /*<div className= {`chat-bubble ${user}`}>
                <div className="d-flex justify-content-between">
                    <p className="small mb-1">{user}</p>
                    <p className="small mb-1 text-muted">23 Jan 2:00 pm</p>
                </div>
                <div className="d-flex flex-row justify-content-start">
                    <img src = {img} alt="pofile" style={{ width: "45px", height: "100%" }}/>
                    <div>
                        <p className="small p-2 ms-3 mb-3 rounded-3" style={{ backgroundColor: "#f5f6f7" }}>
                            {message}
                        </p>
                    </div>
                </div>
            </div>*/
    
}

export default MessageBox