/*
Predicting Commodity Food Pricing Frontend
Date: 3/17/2024
This jsx file takes in the list of previous messages, and prints them out in a msg bubble format

"build": "react-scripts build", <- Removed from package.json
*/
import MessageBox from "./MessageBox.jsx";

const Conversation = (props) => {
    //List of previous messages is passed to Conversation
    const previousMessages = props.messages;
    //List to store all the HTML/REACT structure for the msg bubbles
    let msgBubbles = [];

    console.log(previousMessages.length);
    for(let i = 0; i < previousMessages.length; i++){
        //If its the same user saying two messages, we don't want the name and image to display
        var same_user = false;
        if (i !== 0 && previousMessages[i-1].sender===previousMessages[i].sender) {
            same_user = true;
        }
        msgBubbles.push(<MessageBox message={previousMessages[i].text} user={previousMessages[i].sender} key={i + previousMessages[i].text} same_user={same_user}/>); //May need to add a .something after list index if using JSON
    }

    return (
        <div className = "chat">
            {msgBubbles}
        </div>
    )
};

export default Conversation;