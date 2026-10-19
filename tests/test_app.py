import pytest
from aiohttp import client_exceptions

from main import get_allowed_origins, init_app


@pytest.mark.asyncio
async def test_http_get_renders_chat_page(aiohttp_client):
    app = await init_app()
    client = await aiohttp_client(app)

    resp = await client.get("/")
    assert resp.status == 200
    text = await resp.text()
    assert "<vg-conversation-list>" in text


def test_get_allowed_origins_from_env(monkeypatch):
    monkeypatch.setenv(
        "ALLOWED_ORIGINS",
        " https://chat.example.com ,https://admin.example.com,, ",
    )
    assert get_allowed_origins() == {
        "https://chat.example.com",
        "https://admin.example.com",
    }


@pytest.mark.asyncio
async def test_websocket_rejects_disallowed_origin(aiohttp_client):
    app = await init_app()
    app["allowed_origins"] = {"https://chat.example.com"}
    client = await aiohttp_client(app)

    with pytest.raises(client_exceptions.WSServerHandshakeError):
        await client.ws_connect("/", headers={"Origin": "https://evil.example.com"})


@pytest.mark.asyncio
async def test_websocket_join_and_broadcast(aiohttp_client):
    app = await init_app()
    app["allowed_origins"] = {"https://chat.example.com"}
    client = await aiohttp_client(app)

    ws1 = await client.ws_connect("/", headers={"Origin": "https://chat.example.com"})
    ws1_connect = await ws1.receive_json()
    assert ws1_connect["action"] == "connect"

    ws2 = await client.ws_connect("/", headers={"Origin": "https://chat.example.com"})
    ws2_connect = await ws2.receive_json()
    assert ws2_connect["action"] == "connect"

    ws1_join = await ws1.receive_json()
    assert ws1_join["action"] == "join"
    assert ws1_join["user"]["name"] == ws2_connect["user"]["name"]

    await ws1.send_str("hello team")
    ws2_sent = await ws2.receive_json()
    assert ws2_sent["action"] == "sent"
    assert ws2_sent["text"] == "hello team"
    assert ws2_sent["user"]["name"] == ws1_connect["user"]["name"]

    await ws2.close()
    ws1_disconnect = await ws1.receive_json()
    assert ws1_disconnect["action"] == "disconnect"
    assert ws1_disconnect["user"]["name"] == ws2_connect["user"]["name"]

    await ws1.close()
