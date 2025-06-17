from app.models.model import BaseModel
import re

regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'


class User(BaseModel):
    def __init__(self, first_name, last_name, email, is_admin=False):
        super().__init__()
        if isinstance(first_name, str) and len(first_name) <= 50:
            self.__first_name = first_name
        else:
            raise ValueError
        if isinstance(last_name, str) and len(last_name) <= 50:
            self.__last_name = last_name
        else:
            raise ValueError
        if isinstance(email, str) and re.match(regex, email):
            self.__email = email
        else:
            raise ValueError
        self.__is_admin = is_admin

    @property
    def first_name(self):
        return self.__first_name

    @first_name.setter
    def first_name(self, first_name):
        if isinstance(first_name, str) and len(first_name) <= 50:
            self.__first_name = first_name
        else:
            raise ValueError

    @property
    def last_name(self):
        return self.__last_name

    @last_name.setter
    def last_name(self, last_name):
        if isinstance(last_name, str) and len(last_name) <= 50:
            self.__last_name = last_name
        else:
            raise ValueError

    @property
    def email(self):
        return self.__email

    @email.setter
    def email(self, email):
        if isinstance(email, str) and re.match(regex, email):
            self.__email = email
        else:
            raise ValueError
