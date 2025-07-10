from app.models.model import db, BaseModel
from app import db


class Review(BaseModel):
    __tablename__ = 'reviews'

    title = db.Column(db.Text, nullable=False)
    text = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    place_id = db.Column(db.String(36), db.ForeignKey('places.id'), nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)

    def save(self):
        if not (1 <= self.rating <= 5):
            raise ValueError("Rating must be an integer between 1 and 5")

    def __repr__(self):
        return (f"<Review {self.id}")

    """
    def __init__(self, title, text, rating, place_id, place, user_id, user):
        super().__init__()
        self.title = title
        if text is not None and len(text) > 0:
            self.__text = text
        else:
            raise ValueError("Text can't be empty")
        if 1 <= rating <= 5:
            self.__rating = rating
        else:
            raise ValueError("Rating must be an integer between 1 and 5")
        self.place_id = place_id
        self.place = place
        self.user_id = user_id
        self.user = user

    @property
    def text(self):
        return self.__text

    @text.setter
    def text(self, text):
        if text is not None and len(text) > 0:
            self.__text = text
        else:
            raise ValueError("Text can't be empty")

    @property
    def rating(self):
        return self.__rating

    @rating.setter
    def rating(self, rating):
        if 1 <= rating <= 5:
            self.__rating = rating
        else:   
            raise ValueError("Rating must be an integer between 1 and 5")
    """
