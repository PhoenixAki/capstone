import praw
from praw.models import MoreComments


def scrape_reddit():
    reddit = praw.Reddit(client_id='3wJeghy32ffBPA', client_secret='3-IhGa_rCqUI0lidaKzlG8m1Egn--g',
                         user_agent='Capstone')
    print("Getting ids...")
    get_ids(reddit)
    print("Reading ids...")
    ids = read_ids()
    print("Getting comments...")
    get_comments(reddit, ids)
    print("Cleaning comments...")
    clean_comments()


def get_ids(reddit):
    chatting_ids = []
    for post in reddit.subreddit('CasualConversation').new(limit=None):
        chatting_ids.append(post.id)

    for post in reddit.subreddit('CasualConversation').top(limit=None):
        if post.id not in chatting_ids:
            chatting_ids.append(post.id)

    for post in reddit.subreddit('CasualConversation').hot(limit=None):
        if post.id not in chatting_ids:
            chatting_ids.append(post.id)

    write_file = open("post_ids.txt", mode='w')
    for post_id in chatting_ids:
        write_file.write(post_id + ',')


def read_ids():
    id_file = open("post_ids.txt")
    ids = id_file.readline().split(',')
    return ids[:-1]


def get_comments(reddit, ids):
    i = 0
    comments = []

    for post_id in ids:
        i += 1
        if i % 50 == 0:
            print("post " + str(i) + "/" + str(len(ids)))
        post = reddit.submission(id=post_id)
        new_comments = post.comments.list()
        for comment in new_comments:
            if isinstance(comment, MoreComments):
                continue
            comments.append(comment.body)

    write_file = open("comments_to_clean.txt", mode='w')
    for comment in comments:
        try:
            write_file.write(comment.replace('\n', '') + '\n')
        except UnicodeEncodeError:
            continue
        except Exception:
            print("Exception on comment\n\"" + comment + "\"")
            continue


def clean_comments():
    comment_file = open("comments_to_clean.txt")  # open uncleaned comments file
    comments = comment_file.readlines()  # read in data from file
    cleaned_comments = []  # initialize list of cleaned comments
    for comment in comments:
        comment = comment.strip()  # strip to remove any leading or trailing whitespace
        try:
            if "[removed]" in comment or "[deleted]" in comment or len(comment) < 5:  # check for removed/deleted/short comments
                continue
            if comment[-1] != '.' and comment[-1] != '!' and comment[-1] != '?':  # add punctuation if not already at end
                comment += '.'
            cleaned_comments.append(comment)
        except Exception:
            print("Exception on comment \"" + comment + "\"")  # discard any comment with exceptions, most often for Unicode Encoding issues
            continue

    write_file = open("comments.txt", mode='w')
    for comment in cleaned_comments:
        write_file.write(comment + "\n")  # write te cleaned comments to a final output file to be used for training
