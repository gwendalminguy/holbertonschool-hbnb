from model import BaseModel


class Place(BaseModel):
    def __init__(self, title, description, price, latitude, longitude, owner, rooms, capacity, surface):
        super().__init__()
        self.title = title
        self.description = description
        self.price = price
        self.latitude = latitude
        self.longitude = longitude
        self.owner = owner
        self.rooms = rooms
        self.capacity = capacity
        self.surface = surface
        self reviews = []
        self.amenities = []

    def add_review(self, review):
        self.reviews.append(review)

    def add_amenity(self, amenity):
        self.amenities.append(amenity)
