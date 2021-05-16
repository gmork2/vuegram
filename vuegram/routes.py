import pathlib
import aiohttp_cors

PROJECT_ROOT = pathlib.Path(__file__).parent


def setup_routes(app):
    cors = aiohttp_cors.setup(
        app,
        defaults={
            "*": aiohttp_cors.ResourceOptions(
                allow_credentials=True,
                expose_headers="*",
                allow_headers="*",
            )
        }
    )

    app.router.add_static(
        '/static/',
        path=PROJECT_ROOT / 'static',
        name='static'
    )
