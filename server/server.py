from flask import Flask, request
from flask_cors import CORS, cross_origin
from AIBot import AIBot
bot = AIBot()

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/', methods=["POST"])
@cross_origin()
def handle_post():
    echo = bool(request.json["message"]["echoReply"])  # extract the echoReply setting
    user = request.json["message"]["user"]  # extract the username
    if echo:
        reply = request.json["message"]["content"]  # extract the reply
        return {
            'response': {
                'content': f"Hello, {user}. You just said \"{reply}\".",
                'user': "Server Echo Service",
                'echoReply': echo
            },
        }
    else:
        reply = bot.generate_reply(request.json["message"]["content"], user)  # tell the AI to generate a reply
        return {
            'response': {
                'content': reply,
                'user': "AI",
                'echoReply': echo
            },
        }


if __name__ == '__main__':
    app.run(host="0.0.0.0")
