import { useState, useEffect } from 'react';

const AnimatedTextDisplay = (props) => {

    // Use state to manage the current text being displayed
    const [index, setIndex] = useState(0);
    const [text, setText] = useState("");

    //For Texting Purposes
    //console.log(props)
    //console.log(props.sender === 'bot');

    // Use effect to get notified whenever values change or the component is mounted
    useEffect(() => {

        // If the full text is already displayed then don't do anything
        if (props.sender === 'bot' && index < props.text.length) {

            // Set a timer to display the next character
            const timeout = setTimeout(() => {
                setText(prevText => prevText + props.text[index]);
                setIndex(prevIndex => prevIndex + 1);
            }, 10);

            // Clear the timeout after the component mounts or when intermediate dependencies change
            return () => clearTimeout(timeout);
        } else if(index < props.text.length){
            const timeout = setTimeout(() => {
                setText(prevText => prevText + props.text[index]);
                setIndex(prevIndex => prevIndex + 1);
            }, 0);

            // Clear the timeout after the component mounts or when intermediate dependencies change
            return () => clearTimeout(timeout);
        }
    }, [index, text]);

    // render the text
    return <span>{text}</span>;
}

export default AnimatedTextDisplay;
