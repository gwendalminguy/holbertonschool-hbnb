from app.models.model import BaseModel
from sqlalchemy.orm import relationship, validates
from app import db


class Amenity(BaseModel):
    __tablename__ = "amenities"

    name = db.Column(db.String(50), nullable=False)

    places = db.relationship('Place', secondary='place_amenity', back_populates ='amenities', lazy=True)

    def __repr__(self):
        return (f"<Amenity {self.id} - {self.name}")

    @validates("name")
    def validate_name(self, key, name):
        if len(name) <= 50:
            return name
        else:
            raise ValueError
