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
        msgBubbles.push(<MessageBox message = {previousMessages[i].text} user = {previousMessages[i].sender}/>); //May need to add a .something after list index if using JSON
    }

    return (
        <div>
            {msgBubbles}
        </div>
    )
};

export default Conversation;