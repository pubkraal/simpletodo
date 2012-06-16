from pyramid.response import Response
from sqlalchemy.exc import DBAPIError

from simpletodo.models import (
    DBSession,
    Todo
    )


def list(request):
    todos = DBSession.query(Todo).filter(Todo.done!=True).order_by(Todo.due.asc())
    return {'todos': [t.get_dict() for t in todos]}


def store(request):
    return {'status': 'ok'}


def close(request):
    todo = DBSession.query(Todo).get(request.POST.get('id'))
    print "Closing", todo
    if todo:
        todo.done = True

    DBSession.commit()
