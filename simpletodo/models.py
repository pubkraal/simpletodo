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
    done = Column(Boolean, index=True, default=False)
    text = Column(String(200), index=True)

    def __init__(self, due, text):
        if isinstance(due, datetime.datetime):
            self.due = due
            self.text = text
            self.done = False

    def get_dict(self):
        return {'due': self.due.strftime("%Y-%m-%d"),
                'duetext': self.get_due_text(),
                'status': self.get_todo_status(),
                'done': self.done,
                'text': self.text,
                'id': int(self.id)}

    def get_due_text(self):
        return self.due.strftime("%e %b %Y").strip()

    def get_todo_status(self):
        if self.due.date() < datetime.date.today():
            return 'important'
        elif self.due.date() == datetime.date.today():
            return 'warning'
        else:
            return ''
