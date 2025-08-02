from app.models.model import db, BaseModel
from sqlalchemy.orm import relationship, validates
from app import db

place_amenity = db.Table('place_amenity',
    db.Column('place_id', db.String(36), db.ForeignKey('places.id', ondelete='CASCADE'), primary_key=True),
    db.Column('amenity_id', db.String(36), db.ForeignKey('amenities.id', ondelete='CASCADE'), primary_key=True)
)


class Place(BaseModel):
    __tablename__ = 'places'

    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    rooms = db.Column(db.Integer, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    surface = db.Column(db.Float, nullable=False)
    owner_id = db.Column(db.String(36), db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    
    # Relationships
    owner = db.relationship("User", back_populates="places", passive_deletes=True, lazy=True)
    reviews = db.relationship('Review', back_populates='place', passive_deletes=True, lazy=True)
    amenities = db.relationship('Amenity', secondary=place_amenity, back_populates ='places', lazy=True)

    def __repr__(self):
        return (f"<Place {self.id} - {self.title}>")
    
    def add_review(self, review):
        self.reviews.append(review)

    def add_amenity(self, amenity):
        self.amenities.append(amenity)

    @validates("title")
    def validate_title(self, key, title):
        if title is not None and 0 < len(title) <= 100:
            return title
        else:
            raise ValueError

    @validates("price")
    def validate_price(self, key, price):
        if price is not None and price >= 0:
            return price
        else:
            raise ValueError

    @validates("latitude")
    def validate_latitude(self, key, latitude):
        if latitude is not None and -90.0 <= latitude <= 90.0:
            return latitude
        else:
            raise ValueError

    @validates("longitude")
    def validate_longitude(self, key, longitude):
        if longitude is not None and -180.0 <= longitude <= 180.0:
            return longitude
        else:
            raise ValueError
