from pyramid.response import Response
from pyramid.view import view_config

from sqlalchemy.exc import DBAPIError

from simpletodo.models import (
    DBSession,
    MyModel,
    )

conn_err_msg = "Probleem"


def my_view(request):
    try:
        one = DBSession.query(MyModel).filter(MyModel.name=='one').first()
    except DBAPIError:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {'one':one, 'project':'simpletodo'}


