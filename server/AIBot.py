import gpt_2_simple as gpt2


class AIBot:
    def __init__(self):
        # gpt2.download_gpt2(model_name="355M")
        self.conversation = "Hello, my name is Sean. You are an AI model that I have trained."
        self.sess = gpt2.start_tf_sess()
        gpt2.load_gpt2(self.sess, run_name='reddit-5000-steps-2')

    def generate_reply(self, user_message):
        self.conversation += user_message
        reply = gpt2.generate(self.sess, length=50, prefix=self.conversation, run_name='reddit-5000-steps-2',
                              return_as_list=True)[0]
        reply = reply.replace(self.conversation, "").strip()

        if "." in reply:
            reply = reply[:reply.rfind('.')+1]
        if "?" in reply:
            reply = reply[:reply.rfind('?')+1]
        if "!" in reply:
            reply = reply[:reply.rfind('!')+1]

        self.conversation += reply
        return reply

    def bot_loop(self):
        while True:
            user_input = input("USER: ")
            self.conversation += user_input
            reply = gpt2.generate(self.sess, length=50, prefix=self.conversation, run_name='reddit-5000-steps-2',
                                  return_as_list=True)[0]
            reply = reply.replace(self.conversation, "").strip()

            if "." in reply:
                reply = reply[:reply.rfind('.') + 1]
            if "?" in reply:
                reply = reply[:reply.rfind('?') + 1]
            if "!" in reply:
                reply = reply[:reply.rfind('!') + 1]

            print("BOT: " + reply)
            self.conversation += reply