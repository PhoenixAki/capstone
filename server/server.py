from flask import Flask, request
from flask_cors import CORS, cross_origin
from AIBot import AIBot

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

USE_BOT = False
if USE_BOT:
    bot = AIBot()


@app.route('/', methods=["POST"])
@cross_origin()
def test_post():
    if USE_BOT:
        reply = bot.generate_reply(request.json["message"]["content"])
        return {
            'response': {
                'content': reply,
                'author': "AI",
            },
        }
    else:
        author = request.json["message"]["author"]
        reply = request.json["message"]["content"]
        return {
            'response': {
                'content': f"Hello, {author}. You just said \"{reply}\".",
                'author': "Server",
            },
    }


if __name__ == '__main__':
    app.run()
