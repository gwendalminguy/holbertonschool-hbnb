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
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/places/ -H "Content-Type: application/json" -d '{"title": "Nice French Apartment", "description": "Cozy apartment in the center of Toulouse", "price": 225.0, "latitude": 85, "longitude": 125, "owner_id": "'"$OWNER"'", "rooms": 3, "capacity": 4, "surface": 55.5, "amenities": ["'"$AMENITY_1"'", "'"$AMENITY_2"'"]}')
export PLACE="$(echo "$RESPONSE" | jq -r '.id')"
echo "Place ID: $PLACE"

echo -e "\n> Create New Review:"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/reviews/ -H "Content-Type: application/json" -d '{"title": "Great place!", "text": "I had a very good time in Toulouse. Hope to come bck soon!", "rating": 4, "user": "'"$OWNER"'", "place": "'"$PLACE"'"}')
export REVIEW="$(echo "$RESPONSE" | jq -r '.id')"
echo "Review ID: $REVIEW"

echo -e "\n> Get Place:"
curl -X GET http://localhost:5000/api/v1/places/$PLACE
