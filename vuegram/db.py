async def init_db(app):
    conf = app['config']['postgres']
    # engine = await aiopg.sa.create_engine(
    #     database=conf['database'],
    #     user=conf['user'],
    #     password=conf['password'],
    #     host=conf['host'],
    #     port=conf['port'],
    #     minsize=conf['minsize'],
    #     maxsize=conf['maxsize'],
    # )
    engine = None
    app['db'] = engine


async def close_db(app):
    app['db'].close()
    await app['db'].wait_closed()
