//Future App goes here
import React, { useState } from 'react';
import './App.css'; // Import for CSS styling
import AnimatedTextDisplay from './AnimatedText.js';
import Header from "./Header";
import Conversation from "./Conversation.jsx"
import MessageBox from "./MessageBox.jsx"
import Footer from "./Footer.jsx"

const App = (props) => {

  const [country, setCountry] = useState("United States");
  const [language, setLanguage] = useState("English");

  const [messages, setMessages] = useState(
  [{
    text: "Hello",
    sender: "person"
  },
  {
    text: "This is a test for a long sentence",
    sender: "bot"
  },
  {
    text: "I sent another message",
    sender: "bot"
  },
  {
    text: "Hello",
    sender: "person"
  },
  {
    text: "This is a test for a long sentence",
    sender: "bot"
  }]);

  const [index, setIndex] = useState(0);

  const sendMessage = async (input) => {
    //console.log(input);
    if (!input.trim()){
      return; // Avoid sending empty messages
    }

    // Add the user's input to messages for immediate UI update
    setMessages((messages) => [...messages, { text: input, sender: 'person' },]);

    try {
      const response = await fetch('http://localhost:5001/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input, count: index}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update the index +1
      setIndex(prevIndex => prevIndex + 1);

      const data = await response.json();
      //set timeout for every .5 seconds and then adjust the state (look at useEffect instead)

      var data_searched_message = '';
      
      // If the bot searched for data, add 'Searching for <data>' to messages
      if (data.data_searched) {
        data_searched_message = "Searching for " + data.data_searched + "...";
        setMessages((messages) => [...messages, { text: data_searched_message, sender: 'bot' },]);
      }
    
      // Add the bot's response to messages
      setMessages((messages) => [...messages, { text: data.reply, sender: 'bot' }, ]);
    } catch (error) {
      console.error('There was a problem sending/receiving the message:', error);
    }
  };

  const onCountrySelectChanged = (country) => {
    setCountry(country);
  }

  const onLanguageSelectChanged = (language) => {
    setLanguage(language);
  }
  
  return (
    <div className = "App">
      {/* <div className="chat-container">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link>
        <div className="chat-header">
          <img src='logo.png' alt=" Next Step Logo" className="header-image" />
        </div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'bot'}`}>
              <AnimatedTextDisplay text = {msg.text} sender = {msg.sender} />
            </div>
          ))}
        </div>
        <div className="input-container">
          <input 
            id = 'textInput' 
            onKeyDown={(event) => { if(event.code === 'Enter'){sendMessage();}}} //When enter is pressed the message
            value={input} onChange={(e) => setInput(e.target.value)} type="text"/>
          <button onClick={sendMessage}>Send</button>
        </div>
      </div> */}

      <header>
        <Header country={country} onLanguageSelectChanged = {onLanguageSelectChanged} onCountrySelectChanged={onCountrySelectChanged} language={language}/>
      </header>
      <content>
        <Conversation messages = {messages}/>
      </content>
      <footer>
        <Footer sendMessage = {sendMessage}/> 
      </footer>
    </div>
  );

}


export default App;