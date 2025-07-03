from app.models.review import Review
from app import db
from app.persistence.repository import SQLAlchemyRepository


class ReviewRepository():
    def __init__(self):
        super().__init__(Review)
    
    def __repr__(self):
        return (f"<Review {self.id}")
