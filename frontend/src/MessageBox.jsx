/*
This jsx file creates a message bubble for each message that has occured in the chat
*/

const MessageBox = (props) => {
    const message = props.message;
    let user;
    let img;

    if(props.user === "person"){
        user = "User";
        img = "frontend/public/FAO_logo_white.png"; //Insert image path here
    } else {
        user = "NourishNet"
        img = "frontend/public/FAO_logo.png"; //Interset image path here
    }

    return (
        <div>
            <div className="d-flex justify-content-between">
                <p className="small mb-1">{user}</p>
                <p className="small mb-1 text-muted">23 Jan 2:00 pm</p>
            </div>
            <div className="d-flex flex-row justify-content-start">
                <img src={img} alt="pofile picture" style={{ width: "45px", height: "100%" }}/>
                <div>
                    <p className="small p-2 ms-3 mb-3 rounded-3" style={{ backgroundColor: "#f5f6f7" }}>
                        {message}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MessageBox