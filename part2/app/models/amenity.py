from app.models.model import BaseModel


class Amenity(BaseModel):
    def __init__(self, name):
        super().__init__()
        if len(name) <= 50:
            self.__name = name
        else:
            raise ValueError
    
    @property
    def name(self):
        return self.__name
    
    @name.setter
    def name(self, name):
        if len(name) <= 50:
            self.__name = name
        else:
            raise ValueError
