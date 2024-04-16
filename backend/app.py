from flask import Flask, jsonify, request, session
from flask_cors import CORS
import openai  # Import the OpenAI library

app = Flask(__name__)
CORS(app)

# Replace 'your-openai-api-key' with your actual API key, preferably loading from environment variables
with open('api_key.txt', 'r') as file:
    openai.api_key = file.read().strip()

chat_history = []

@app.route('/api/send-message', methods=['POST'])
def send_message():
    if request.method == 'POST':
        data = request.json
        user_message = data['message']
        nation = data['nation']
        language = data['language']

        warnings = {
            "Select Country": "select warning",
            "Argentina": "high",
            "Australia": "low",
            "Brazil": "high",
            "Canada": "low",
            "India": "high",
            "Pakistan": "high",
            "Russian Federation": "moderate",
            "Thailand": "moderate",
            "Ukraine": "high",
            "United Kingdom": "low",
            "United States": "low",
            "Uruguay": "moderate",
            "Vietnam": "moderate",
            "China": "moderate",
            "Germany": "low",
            "France": "low",
            "South Africa": "high",
        };
        warning = warnings[nation]

        print("USER MESSAGE: ", user_message)
        print("NATION: ", nation)
        print("LANGUAGE: ", language)
        print("CHAT HISTORY: ", chat_history)

        conversation_prompt = f"""
        You are a chat-bot responsible for responding with concise advice on behalf of the United Nations Food and Agriculture Organization (FAO). 
        You specifically provide advice in regards to the warnings sent out on the Global Information and Early Warning System on Food and Agriculture (GIEWS) 
        where specific countries have no warning, a moderate warning, or a high warning in regards to food insecurity and price. 

        Understanding this, and given that a user speaks {language} and is from {nation} which is currently under {warning} warning, 
        write a preliminary message to start the conversation and outline the situation. Remember, your messages should be concise and provide the most 
        amount of information possible in the shortest amount of text. One of your messages should never exceed more than 45 words. 
        If no country is selected, please remind the user to select a country and state what your role in the conversation is.

        Your message should be more targeted towards an individual rather than a government official or an internal UN statistician. 
        Change the tone/jargon of your message to match this new requirement. Also, be sure to answer the person's question or statement only if its appropriate; 
        otherwise, point them to the types of questions that would be appropriate. Remember to respond in {language}! No emojis.
        """

        messages = [
            {"role": "user", "content": "OUR PREVIOUS CHAT HISTORY: " + str(chat_history)},
            {"role": "system", "content": conversation_prompt},
            {"role": "user", "content": user_message}
        ]

        # Use the chat completion endpoint for the chat model
        bot_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Ensure to use the correct chat model
            messages=messages
        ).choices[0].message['content']

        chat_history.append("USER QUESTION: " + user_message)
        chat_history.append("YOUR RESPONSE: " + bot_response)

        # Return the bot's response as JSON
        return construct_json(bot_response, '') 

def construct_json(response, data_searched):
    json_response = {
        "reply": response,
        "data_searched": data_searched,
    }

    print()
    print("Bot response: ")
    print(json_response)
    print()
    return jsonify(json_response)  # Use jsonify here for proper response formatting

if __name__ == '__main__':
    app.run(debug=True)
