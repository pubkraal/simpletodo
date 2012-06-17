from pyramid.response import Response
from sqlalchemy.exc import DBAPIError

from simpletodo.models import (
    DBSession,
    Todo
    )

conn_err_msg = "Probleem"


def home(request):
    return {'project':'simpletodo', 'session': request.session}


