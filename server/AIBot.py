import gpt_2_simple as gpt2
import tensorflow as tf

conversations = {}  # initialize dictionary of conversations


class AIBot:
    graph = tf.get_default_graph()

    def __init__(self):
        # gpt2.download_gpt2(model_name="355M")
        self.sess = gpt2.start_tf_sess()
        gpt2.load_gpt2(self.sess, run_name='reddit-5000-steps-2')  # load trained model

    def generate_reply(self, user_message, username):
        conversation = conversations.get(username, "")  # retrieve conversation history for this user, if it exists
        conversation += " " + user_message  # append new message to the conversation

        # graph.as_default avoids a threading issue where the AI doesn't generate the reply on the same thread as Flask
        with self.graph.as_default():
            reply = gpt2.generate(self.sess, length=35, prefix=conversation, run_name='reddit-5000-steps-2',
                                  return_as_list=True)[0]

        # reply is generated with conversation as prefix at the start, this removes it and strips trailing whitespace
        reply = reply.replace(conversation, "").strip()

        # token length 35 usually cuts reply off mid-sentence, this adjusts it to be up to the final punctuation mark
        if "." in reply:
            reply = reply[:reply.rfind('.')+1]
        if "?" in reply:
            reply = reply[:reply.rfind('?')+1]
        if "!" in reply:
            reply = reply[:reply.rfind('!')+1]

        conversation += " " + reply  # append AI reply to the conversation

        # update the stored conversation with the new messages
        conversations[username] = conversation
        return reply

    def bot_loop(self):
        conversation = ""
        while True:
            user_input = input("USER: ")
            conversation += user_input
            reply = gpt2.generate(self.sess, length=50, prefix=conversation, run_name='reddit-5000-steps-2',
                                  return_as_list=True)[0]
            reply = reply.replace(conversation, "").strip()

            if "." in reply:
                reply = reply[:reply.rfind('.') + 1]
            if "?" in reply:
                reply = reply[:reply.rfind('?') + 1]
            if "!" in reply:
                reply = reply[:reply.rfind('!') + 1]

            print("BOT: " + reply)
            conversation += reply
