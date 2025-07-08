from app.models.model import BaseModel
import re
import uuid
from app import db, bcrypt

regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
#  db = SQLAlchemy()


class User(BaseModel):
    """def __init__(self, first_name, last_name, email, password, is_admin=False):
        super().__init__()
        if len(first_name) <= 50:
            self.__first_name = first_name
        else:
            raise ValueError
        if len(last_name) <= 50:
            self.__last_name = last_name
        else:
            raise ValueError
        if re.match(regex, email):
            self.__email = email
        else:
            raise ValueError
        self.is_admin = is_admin

    @property
    def first_name(self):
        return self.__first_name

    @first_name.setter
    def first_name(self, first_name):
        if len(first_name) <= 50:
            self.__first_name = first_name
        else:
            raise ValueError

    @property
    def last_name(self):
        return self.__last_name

    @last_name.setter
    def last_name(self, last_name):
        if len(last_name) <= 50:
            self.__last_name = last_name
        else:
            raise ValueError

    @property
    def email(self):
        return self.__email

    @email.setter
    def email(self, email):
        if re.match(regex, email):
            self.__email = email
        else:
            raise ValueError"""
    __tablename__ = 'users'

    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(128), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

    def hash_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def verify_password(self, password):
        return bcrypt.check_password_hash(self.password, password)
