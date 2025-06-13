from model import BaseModel


class Amenity(BaseModel):
    def __init__(self, name):
        self.name = name
