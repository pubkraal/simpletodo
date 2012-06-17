from pyramid_beaker import session_factory_from_settings
from pyramid.config import Configurator
from sqlalchemy import engine_from_config

from simpletodo.lib import routing
from simpletodo.models import DBSession

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    session_factory = session_factory_from_settings(settings)

    config = Configurator(settings=settings)
    config.set_session_factory(session_factory)
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_static_view('assets', 'static', cache_max_age=86400)
    config.add_subscriber('simpletodo.lib.events.before_request',
                          'pyramid.events.NewResponse')

    routing.setup(config)
    return config.make_wsgi_app()

