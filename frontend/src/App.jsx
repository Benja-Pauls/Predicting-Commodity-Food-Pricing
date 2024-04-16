//Future App goes here
import React, { useState } from 'react';
import './App.css'; // Import for CSS styling
import AnimatedTextDisplay from './AnimatedText.js';
import Header from "./Header";
import Conversation from "./Conversation.jsx"
import MessageBox from "./MessageBox.jsx"
import Footer from "./Footer.jsx"

const App = (props) => {

    const [country, setCountry] = useState('Select Country');
    const [language, setLanguage] = useState('Select Language');

    const handleCountryChange = (selectedCountry) => {
        setCountry(selectedCountry);
    };

    const handleLanguageChange = (selectedLanguage) => {
        setLanguage(selectedLanguage);
    };

  const messagesEndRef = React.useRef(null); // Ref for scrolling to bottom

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  };

  const [messages, setMessages] = useState([
    { text: "Hello! As an FAO chat-bot, I provide guidance based on the Global Information and Early Warning System on Food and Agriculture (GIEWS). Please select a nation to get started, as well as a preferred language of communication. How can I assist?", sender: 'bot' }
]);

  const [index, setIndex] = useState(0);

  const typeMessage = (message, sender) => {
    let currentText = '';
    const fullText = message;
    const speed = 7; // Speed in milliseconds

    const typeChar = () => {
        if (currentText.length < fullText.length) {
            currentText = fullText.substring(0, currentText.length + 1);
            setMessages(messages => [...messages.filter(msg => msg.sender !== 'typing'), { text: currentText, sender: 'typing' }]);
            setTimeout(typeChar, speed);
        } else {
            // Once complete, replace 'typing' message with final message
            setMessages(messages => [...messages.filter(msg => msg.sender !== 'typing'), { text: fullText, sender: sender }]);
        }
    };

    typeChar();
};
  
const sendMessage = async (input) => {
    if (!input.trim()) {
        return; // Avoid sending empty messages
    }

    // Add the user's input to messages for immediate UI update
    setMessages(messages => [...messages, { text: input, sender: 'person' }]);

    scrollToBottom();

    try {
        const response = await fetch('http://localhost:5001/api/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: input,
                nation: country,
                language: language,
                count: index
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        setIndex(prevIndex => prevIndex + 1);
        const data = await response.json();

        // If the bot searched for data
        if (data.data_searched) {
            const data_searched_message = "Searching for " + data.data_searched + "...";
            setMessages(messages => [...messages, { text: data_searched_message, sender: 'bot' }]);
        }

        // Simulate typing effect for the bot's response
        typeMessage(data.reply, 'bot');
    } catch (error) {
        console.error('There was a problem sending/receiving the message:', error);
    }
};


  const onCountrySelectChanged = (country) => {
    setCountry(country);
  };

  const onLanguageSelectChanged = (language) => {
    setLanguage(language);
  };
  
  return (
    <div className = "App">
      <header>
        <Header country={country} onLanguageSelectChanged = {onLanguageSelectChanged} onCountrySelectChanged={onCountrySelectChanged} language={language}/>
      </header>
      <content id="content">
        <Conversation messages = {messages}/>
      </content>
      <footer>
        <Footer sendMessage = {sendMessage}/>
        <div style={{height:"50px"}}></div>
        <div ref={messagesEndRef}>
        </div> 
      </footer>
    </div>
  );

}


export default App;