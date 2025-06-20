import unittest
from ... import create_app


class TestUserEndpoints(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()

    def test_create_user(self):
        response = self.client.post('/api/v1/users/', json={
            "first_name": "Jane",
            "last_name": "Doe",
            "email": "jane.doe@example.com"
        })
        self.assertEqual(response.status_code, 201)

    def test_create_user_invalid_first_name(self):
        response = self.client.post('/api/v1/users/', json={
            "first_name": "J" * 51,
            "last_name": "Doe",
            "email": "jane.doe@example.com"
        })
        self.assertEqual(response.status_code, 400)

    def test_create_user_invalid_last_name(self):
        response = self.client.post('/api/v1/users/', json={
            "first_name": "Jane",
            "last_name": "D" * 51,
            "email": "jane.doe@example.com"
        })
        self.assertEqual(response.status_code, 400)

    def test_create_user_invalid_email(self):
        response = self.client.post('/api/v1/users/', json={
            "first_name": "Jane",
            "last_name": "Doe",
            "email": "jane.doe@invalid"
        })
        self.assertEqual(response.status_code, 400)

    def test_create_user_empty_attributes(self):
        response = self.client.post('/api/v1/users/', json={
            "first_name": "",
            "last_name": "Doe",
            "email": "jane.doe@example.com"
        })
        self.assertEqual(response.status_code, 400)
        response = self.client.post('/api/v1/users/', json={
            "first_name": "Jane",
            "last_name": "",
            "email": "jane.doe@example.com"
        })
        self.assertEqual(response.status_code, 400)
        response = self.client.post('/api/v1/users/', json={
            "first_name": "Jane",
            "last_name": "Doe",
            "email": ""
        })
        self.assertEqual(response.status_code, 400)
