from model import BaseModel


class Place(BaseModel):
    def __init__(self, title, description, price, latitude, longitude, owner, rooms, capacity, surface):
        self.title = title
        self.description = description
        self.price = price
        self.latitude = latitude
        self.longitude = longitude
        self.owner = owner
        self.rooms = rooms
        self.capacity = capacity
        self.surface = surface
