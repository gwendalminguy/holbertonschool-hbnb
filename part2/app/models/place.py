from app.models.model import BaseModel


class Place(BaseModel):
    def __init__(self, title, description, price, latitude, longitude, owner_id, rooms, capacity=0, surface=0):
        super().__init__()
        if isinstance(title, str) and len(title) <= 100:
            self.__title = title
        else:
            raise ValueError
        self.description = description
        if isinstance(price, float) and price >= 0:
            self.__price = price
        else:
            raise ValueError
        if isinstance(latitude, float) and -90.0 <= latitude <= 90.0:
            self.__latitude = latitude
        else:
            raise ValueError
        if isinstance(longitude, float) and -180.0 <= longitude <= 180.0:
            self.__longitude = longitude
        else:
            raise ValueError
        self.owner_id = owner_id
        self.rooms = rooms
        self.capacity = capacity
        self.surface = surface
        self.reviews = []
        self.amenities = []

    def add_review(self, review):
        self.reviews.append(review)

    def add_amenity(self, amenity):
        self.amenities.append(amenity)

    @property
    def title(self):
        return self.__title

    @title.setter
    def title(self, title):
        if isinstance(title, str) and len(title) <= 100:
            self.__title = title
        else:
            raise ValueError

    @property
    def price(self):
        return self.__price

    @price.setter
    def price(self, price):
        if isinstance(price, float) and price >= 0:
            self.__price = price
        else:
            raise ValueError

    @property
    def latitude(self):
        return self.__latitude

    @latitude.setter
    def latitude(self, latitude):
        if isinstance(latitude, float) and -90.0 <= latitude <= 90.0:
            self.__latitude = latitude
        else:
            raise ValueError

    @property
    def longitude(self):
        return self.__longitude

    @longitude.setter
    def longitude(self, longitude):
        if isinstance(longitude, float) and -180.0 <= longitude <= 180.0:
            self.__longitude = longitude
        else:
            raise ValueError
