import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
    Boolean
    )
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import (
    scoped_session,
    sessionmaker,
    )
from zope.sqlalchemy import ZopeTransactionExtension

DBSession = scoped_session(sessionmaker(extension=ZopeTransactionExtension()))
Base = declarative_base()


class Todo(Base):
    __tablename__ = 'todo'
    id = Column(Integer, primary_key=True)
    due = Column(DateTime, index=True)
    done = Column(Boolean, index=True)
    text = Column(String(200), index=True)

    def __init__(self, due, text):
        if istanceof(due, datetime.datetime):
            self.due = due
            self.text = text
