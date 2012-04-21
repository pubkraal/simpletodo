from pyramid.response import Response
from sqlalchemy.exc import DBAPIError

from simpletodo.models import (
    DBSession,
    Todo
    )


def list(request):
    todos = DBSession.query(Todo).filter(Todo.done!=True)
    return {'todos': [t.get_dict() for t in todos]}
