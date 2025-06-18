from app.models.model import BaseModel


class Place(BaseModel):
    def __init__(self, title, description, price, latitude, longitude, owner_id, rooms, capacity=0, surface=0, amenities=[]):
        super().__init__()
        if len(title) <= 100:
            self.__title = title
        else:
            raise ValueError
        self.description = description
        if price >= 0:
            self.__price = price
        else:
            raise ValueError
        if -90.0 <= latitude <= 90.0:
            self.__latitude = latitude
        else:
            raise ValueError
        if -180.0 <= longitude <= 180.0:
            self.__longitude = longitude
        else:
            raise ValueError
        self.owner_id = owner_id
        self.rooms = rooms
        self.capacity = capacity
        self.surface = surface
        self.reviews = []
        self.amenities = [amenity for amenity in amenities]

    def add_review(self, review):
        self.reviews.append(review)

    def add_amenity(self, amenity):
        self.amenities.append(amenity)

    @property
    def title(self):
        return self.__title

    @title.setter
    def title(self, title):
        if len(title) <= 100:
            self.__title = title
        else:
            raise ValueError

    @property
    def price(self):
        return self.__price

    @price.setter
    def price(self, price):
        if price >= 0:
            self.__price = price
        else:
            raise ValueError

    @property
    def latitude(self):
        return self.__latitude

    @latitude.setter
    def latitude(self, latitude):
        if -90.0 <= latitude <= 90.0:
            self.__latitude = latitude
        else:
            raise ValueError

    @property
    def longitude(self):
        return self.__longitude

    @longitude.setter
    def longitude(self, longitude):
        if -180.0 <= longitude <= 180.0:
            self.__longitude = longitude
        else:
            raise ValueError
       