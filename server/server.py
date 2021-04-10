from flask import Flask, request
from flask_cors import CORS, cross_origin
# from AIBot import AIBot

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
# bot = AIBot()


@app.route('/', methods=["POST"])
@cross_origin()
def test_post():
    author = request.json["message"]["author"]
    content = request.json["message"]["content"]
    # generate_reply(gpt2)
    return {
        'response': {
            'content': f"Hello, {author}. You just said \"{content}\".",
            'author': "AI",
        },
    }


if __name__ == '__main__':
    app.run(debug=True)
