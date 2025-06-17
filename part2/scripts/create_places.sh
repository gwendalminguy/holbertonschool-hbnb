#!/bin/bash

#Add dynamic owner_id retrieval
curl -X POST http://localhost:5000/api/v1/places/ -H "Content-Type: application/json" -d '{"title": "Huge Apartment", "description": "Nice place with a view on the beach.", "price": 550.0, "latitude": 65.5, "longitude": -172.5, "owner_id": "d0200297-0c1b-40b5-9f0d-05e11f0c9f1d", "rooms": 6, "capacity": 8, "surface": 85.5}'
