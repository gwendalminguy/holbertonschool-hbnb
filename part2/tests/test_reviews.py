import unittest
from app import create_app


class TestUserEndpoints(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()

    def test_create_review(self):
        # User Creation: Success
        response = self.client.post('/api/v1/users/', json={
            "first_name": "Jane",
            "last_name": "Doe",
            "email": "jane.doe@example.com"
        })
        self.assertEqual(response.status_code, 201)
        user = response.get_json()

        # Place Creation: Success
        response = self.client.post('/api/v1/places/', json={
            "title": "Japanese Loft",
            "description": "Beautiful place in the center of Tokyo.",
            "price": 225.5,
            "latitude": 55.5,
            "longitude": -15.5,
            "rooms": 5,
            "capacity": 8,
            "owner_id": user["id"],
            "amenities": []
        })
        self.assertEqual(response.status_code, 201)
        place = response.get_json()

        # Review Creation: Success
        response = self.client.post('/api/v1/reviews/', json={
            "title": "Good place",
            "text": "This place is very interesting and comfortable.",
            "rating": 4,
            "user_id": user["id"],
            "place_id": place["id"]
        })
        self.assertEqual(response.status_code, 201)


# invalid user_id
    def test_create_review_invalid_user_or_place(self):
        response = self.client.post('/api/v1/users/', json={
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com"
        })
        self.assertEqual(response.status_code, 201)
        user = response.get_json()

        response = self.client.post('/api/v1/places/', json={
            "title": "Japanese Loft",
            "description": "Beautiful place in the center of Tokyo.",
            "price": 225.5,
            "latitude": 55.5,
            "longitude": -15.5,
            "rooms": 5,
            "capacity": 8,
            "owner_id": user["id"],
            "amenities": []
        })
        self.assertEqual(response.status_code, 201)
        place = response.get_json()

        response = self.client.post('/api/v1/reviews/', json={
            "title": "Good place",
            "text": "This place is very interesting and comfortable.",
            "rating": 4,
            "user_id": "12345",  # Invalid user_id
            "place_id": place["id"]
        })
        self.assertEqual(response.status_code, 404)

# invalid place_id
        response = self.client.post('/api/v1/reviews/', json={
            "title": "Good place",
            "text": "This place is very interesting and comfortable.",
            "rating": 4,
            "user_id": user["id"],
            "place_id": "67890"
        })
        self.assertEqual(response.status_code, 404)

# Reference empty text
    def test_create_empty_attribute(self):
        response = self.client.post('/api/v1/users/', json={
            "first_name": "Jonathan",
            "last_name": "Doe",
            "email": "jonathan.doe@example.com"
        })
        user = response.get_json()

        response = self.client.post('/api/v1/places/', json={
            "title": "Japanese Loft",
            "description": "Beautiful place in the center of Tokyo.",
            "price": 225.5,
            "latitude": 55.5,
            "longitude": -15.5,
            "rooms": 5,
            "capacity": 8,
            "owner_id": user["id"],
            "amenities": []
        })
        place = response.get_json()

        response = self.client.post('/api/v1/reviews/', json={
            "title": "Good place",
            "text": "",
            "rating": 4,
            "user_id": user["id"],
            "place_id": place["id"]
        })
        self.assertEqual(response.status_code, 400)

        response = self.client.post('/api/v1/reviews/', json={
            "title": "Good place",
            "text": None,
            "rating": 4,
            "user_id": user["id"],
            "place_id": place["id"]
        })
        self.assertEqual(response.status_code, 400)

# Reference invalid rating
    def test_create_invalid_attribute(self):
        response = self.client.post('/api/v1/users/', json={
            "first_name": "Janeth",
            "last_name": "Doe",
            "email": "janeth.doe@example.com"
        })
        user = response.get_json()

        response = self.client.post('/api/v1/places/', json={
            "title": "Japanese Loft",
            "description": "Beautiful place in the center of Tokyo.",
            "price": 225.5,
            "latitude": 55.5,
            "longitude": -15.5,
            "rooms": 5,
            "capacity": 8,
            "owner_id": user["id"],
            "amenities": []
        })
        place = response.get_json()

        response = self.client.post('/api/v1/reviews/', json={
            "title": "Good place",
            "text": "This place is very interesting and comfortable",
            "rating": 6,
            "user_id": user["id"],
            "place_id": place["id"]
        })
        self.assertEqual(response.status_code, 400)

        response = self.client.post('/api/v1/reviews/', json={
            "title": "Good place",
            "text": "This place is very interesting and comfortable",
            "rating": 0,
            "user_id": user["id"],
            "place_id": place["id"]
        })
        self.assertEqual(response.status_code, 400)
