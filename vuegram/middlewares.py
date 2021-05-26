import aiohttp_jinja2
from aiohttp import web


async def handle_404(request):
    # Return json with available commands
    return aiohttp_jinja2.render_template('404.html', request, {})


async def handle_500(request):
    # Return a simple json response
    return aiohttp_jinja2.render_template('500.html', request, {})


# Convert in class
def create_error_middleware(overrides):

    @web.middleware
    async def error_middleware(request, handler):
        pass
