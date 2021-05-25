import aiohttp_jinja2


async def handle_404(request):
    # Return json with available commands
    return aiohttp_jinja2.render_template('404.html', request, {})


async def handle_500(request):
    # Return a simple json response
    return aiohttp_jinja2.render_template('500.html', request, {})
