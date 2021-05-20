import logging
import random

import aiohttp
from aiohttp import web
import aiohttp_jinja2

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

    async def get(self):
        self.ws = web.WebSocketResponse()
        return await self.handler(self.request)

    async def handler(self, request):
        ws_ready = self.ws.can_prepare(request)
        if not ws_ready.ok:
            return aiohttp_jinja2.render_template('index.html', request, {})

        await self.ws.prepare(request)
        user = get_anonymous_user()

        await self.connect(user)
        await self.join(request, user)
        await self.sent(request, user)
        await self.disconnect(request, user)

        return self.ws

    async def connect(self, user):
        await self.ws.send_json({
            'id': self.message_id,
            'action': 'connect',
            'user': user,
        })
        self.message_id += 1
        log.info(f'Connected {user["name"]}.')

    async def disconnect(self, request, user):
        del request.app['websockets'][user["name"]]
        log.info(f'{user["name"]} disconnected.')

        for ws in request.app['websockets'].values():
            await ws.send_json({
                'id': self.message_id,
                'action': 'disconnect',
                'user': user
            })
        self.message_id += 1
        log.info(f'{user["name"]} disconnected.')

    async def join(self, request, user):
        for ws in request.app['websockets'].values():
            await ws.send_json({
                'id': self.message_id,
                'action': 'join',
                'user': user
            })
        self.message_id += 1
        log.info(f'{user["name"]} joined.')

    async def sent(self, request, user):
        request.app['websockets'][user["name"]] = self.ws
        async for msg in self.ws:

            # await send_position(self.ws)
            # msg = await self.ws.receive()    # timeout=1

            if msg.type == aiohttp.WSMsgType.TEXT:
                for ws in request.app['websockets'].values():
                    # if msg.data == 'close':
                    #     await ws.close()

                    if ws is not self.ws:
                        await ws.send_json({
                            'id': self.message_id,
                            'action': 'sent',
                            'user': user,
                            'text': msg.data
                        })
                self.message_id += 1
                log.info(f'{user["name"]} sent: {msg.data}')

            elif msg.type == aiohttp.WSMsgType.ERROR:
                print(f'ws connection closed with exception: {ws.exception()}')
