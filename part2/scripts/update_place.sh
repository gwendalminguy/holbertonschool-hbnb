#!/bin/bash

echo -e "\n> Create New User:"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/users/ -H "Content-Type: application/json" -d '{"first_name": "John", "last_name": "Doe", "email": "john.doe@example.com"}')
export OWNER="$(echo "$RESPONSE" | jq -r '.id')"
echo "User ID: $OWNER"

echo -e "\n> Create New Amenities:"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/amenities/ -H "Content-Type: application/json" -d '{"name": "Parking"}')
export AMENITY_1="$(echo "$RESPONSE" | jq -r '.id')"
echo "Amenity ID: $AMENITY_1"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/amenities/ -H "Content-Type: application/json" -d '{"name": "Wi-Fi"}')
export AMENITY_2="$(echo "$RESPONSE" | jq -r '.id')"
echo "Amenity ID: $AMENITY_2"

echo -e "\n> Create New Place:"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/places/ -H "Content-Type: application/json" -d '{"title": "Californian Apartment", "description": "Beautiful place with a view on the beach.", "price": 550.0, "latitude": 65.5, "longitude": -172.5, "owner_id": "'"$OWNER"'", "rooms": 6, "capacity": 8, "surface": 85.5, "amenities": [{"id": "'"$AMENITY_1"'"}]}')
export PLACE="$(echo "$RESPONSE" | jq -r '.id')"
echo "Place ID: $PLACE"

echo -e "\n> Get Place Details:"
curl -X GET http://localhost:5000/api/v1/places/$PLACE

cho -e "\n> Update Place:"
curl -X PUT http://localhost:5000/api/v1/places/$PLACE -H "Content-Type: application/json" -d '{"title": "Los Angeles Loft", "description": "Beautiful place with a view on the beach.", "price": 850.0, "latitude": 65.5, "longitude": -172.5, "owner_id": "'"$OWNER"'", "rooms": 6, "capacity": 8, "surface": 185.5, "amenities": [{"id": "'"$AMENITY_2"'"}]}'

echo -e "\n> Get New Place Details:"
curl -X GET http://localhost:5000/api/v1/places/$PLACE
