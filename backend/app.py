from flask import Flask, jsonify, request, session
from flask_cors import CORS
import llm_api 

app = Flask(__name__)
CORS(app)

@app.route('/api/send-message', methods=['POST'])
def send_message():
    if request.method == 'POST':
        data = request.json  
        print()
        print("User message: ")
        print(data)
        print()

        user_message = data['message']
        bot_response = 'Default Message'

        # TODO: Parse and call api 
        # TODO: llm_api.py (from ROSIE)

        # Return the bot's response as JSON
        return construct_json(bot_response, '')
    else:
        return jsonify({'error': 'Invalid request'})
    

def construct_json(response, data_searched):
    json_response = {
        "reply": response,
        "data_searched": data_searched,
    }

    print()
    print("Bot response: ")
    print(json_response)
    print()
    return json_response

if __name__ == '__main__':
    app.run(debug=True)
