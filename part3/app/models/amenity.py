from app.models.model import BaseModel
from app.extensions import db


class Amenity(BaseModel):
    """def __init__(self, name):
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
            raise ValueError"""
    __tablename__ = "amenity"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return (f"<Amenity {self.id} - {self.name}")
