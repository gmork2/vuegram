import logging
import sys
import asyncio
import os

import aiohttp_jinja2
import jinja2
from aiohttp import web

from routes import setup_routes

HOST = os.getenv('HOST', '0.0.0.0')
PORT = int(os.getenv('PORT', 8080))


async def init_app(*args):
    template_dir = os.path.join(os.path.dirname(__file__), 'templates')
    app = web.Application()
    app['websockets'] = {}
    app.on_shutdown.append(shutdown)
    aiohttp_jinja2.setup(
        app, loader=jinja2.FileSystemLoader(template_dir)
    )
    setup_routes(app)
    return app


async def shutdown(app):
    for ws in app['websockets'].values():
        await ws.close()
    app['websockets'].clear()


def main(*args):
    logging.basicConfig(level=logging.DEBUG)
    loop = asyncio.get_event_loop()

    app = init_app(loop)
    web.run_app(app, host=HOST, port=PORT)


if __name__ == '__main__':
    main(sys.argv[1:])
