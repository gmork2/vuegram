import pathlib

import aiohttp_cors

from views.chat import WebSocketHandler


PROJECT_ROOT = pathlib.Path(__file__).parent


def setup_routes(app):
    allowed_origins = app.get('allowed_origins', set())
    if allowed_origins:
        aiohttp_cors.setup(
            app,
            defaults={
                origin: aiohttp_cors.ResourceOptions(
                    allow_credentials=False,
                    expose_headers=("Content-Type",),
                    allow_headers=("Content-Type",),
                ) for origin in allowed_origins
            }
        )
    app.router.add_route('*', '/', WebSocketHandler, name='websocket_handler')
    app.router.add_static(
        '/static/',
        path=PROJECT_ROOT / 'static',
        name='static'
    )
