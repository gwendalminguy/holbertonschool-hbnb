from app.models.model import BaseModel


class Review(BaseModel):
    def __init__(self, title, text, rating, place, user):
        super().__init__()
        self.title = title
        self.text = text
        if 1 <= rating <= 5:
            self.__rating = rating
        else:
            raise ValueError("Rating must be an integer between 1 and 5")
        self.place_id = place
        self.user_id = user

    @property
    def rating(self):
        return self.__rating
    
    @rating.setter
    def rating(self, value):
        if 1 <= value <= 5:
            self.__rating = value
        else:   
            raise ValueError("Rating must be an integer between 1 and 5")
