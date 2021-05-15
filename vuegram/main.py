import logging
import sys
import asyncio
import os

import aiohttp_jinja2
import jinja2
from aiohttp import web

from vuegram.routes import setup_routes

HOST = os.getenv('HOST', '0.0.0.0')
PORT = int(os.getenv('PORT', 8080))


async def init_app(*args):
    app = web.Application()
    aiohttp_jinja2.setup(
        app, loader=jinja2.FileSystemLoader('vuegram/templates')
    )
    setup_routes(app)
    return app


def main(*args):
    logging.basicConfig(level=logging.DEBUG)
    loop = asyncio.get_event_loop()

    app = init_app(loop)
    web.run_app(app, host=HOST, port=PORT)


if __name__ == '__main__':
    main(sys.argv[1:])
