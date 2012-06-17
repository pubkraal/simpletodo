import datetime
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
    try:
        due = datetime.datetime.strptime(request.POST.get('due', ''), "%d-%m-%Y")
        if not due.date() >= datetime.date.today():
            raise Exception("Set a due date in the future please")
    except:
        return {'status': 'error', 'fields': ['due']}
    text = request.POST.get('text')

    DBSession.add(Todo(due, text))
    return {'status': 'ok'}


def close(request):
    todo = DBSession.query(Todo).get(request.POST.get('id'))
    if todo:
        todo.done = True
