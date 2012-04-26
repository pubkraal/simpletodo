import string
import random

def generate_token():
    sel = string.letters + string.digits
    return ''.join([random.choice(sel) for x in xrange(24)])
