import logging
import random

from aiohttp import web

log = logging.getLogger(__name__)


def get_anonymous_user():
    user_id = random.randint(1, 101)
    return {
        'id': user_id,
        'name': 'Anonymous' + str(user_id)
    }


class WebSocketHandler(web.View):
    ws = None
    message_id = 1
