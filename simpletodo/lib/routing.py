def setup(config):
    """ This method is not set up in the way it should be. Preferably I'd
    set up a dictionary with controllers/views and have this generate it. But
    that might be a bit complex. Still working on it.
    Also the template obviously has not a single reason to be here, but this is
    how pyramid works and I find it dirty.
    """
    config.add_route('home', '/',
                     view='simpletodo.views.home',
                     view_renderer='simpletodo:templates/pages/home/home.mako')
    config.add_route('todos', '/todos/list',
                     view='simpletodo.views.todo.list',
                     view_renderer='json')
