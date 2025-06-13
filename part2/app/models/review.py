from model import BaseModel


class Review(BaseModel):
    def __init__(self, title, text, rating, place, user):
        super().__init__()
        self.title = title
        self.text = text
        self.rating = rating
        self.place = place
        self.user = user
