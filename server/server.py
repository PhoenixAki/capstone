from flask import Flask, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

USE_BOT = False
if USE_BOT:
    from AIBot import AIBot
    bot = AIBot()


@app.route('/', methods=["POST"])
@cross_origin()
def handle_post():
    if USE_BOT:
        reply = bot.generate_reply(request.json["message"]["content"])
        return {
            'response': {
                'content': reply,
                'user': "AI",
            },
        }
    else:
        author = request.json["message"]["user"]
        reply = request.json["message"]["content"]
        return {
            'response': {
                'content': f"Hello, {author}. You just said \"{reply}\".",
                'user': "Server",
            },
    }


if __name__ == '__main__':
    app.run()
