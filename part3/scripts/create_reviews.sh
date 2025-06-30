#!/bin/bash

echo -e "\n> Create New User:"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/users/ -H "Content-Type: application/json" -d '{"first_name": "Johnathan", "last_name": "Doe", "email": "johnatan.doe@example.com", "password": "abcd1234"}')
export OWNER="$(echo "$RESPONSE" | jq -r '.id')"
echo "User ID: $OWNER"

echo -e "\n> Create Token:"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/auth/login -H "Content-Type: application/json" -d '{
	"email": "johnathan.doe@example.com",
	"password": "abcd1234"
}')
export JWT="$(echo "$RESPONSE" | jq -r '.access_token')"
echo "Access Token: $JWT"

echo -e "\n> Create New Amenities:"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/amenities/ -H "Content-Type: application/json" -d '{"name": "Parking"}')
export AMENITY_1="$(echo "$RESPONSE" | jq -r '.id')"
echo "Amenity ID: $AMENITY_1"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/amenities/ -H "Content-Type: application/json" -d '{"name": "Wi-Fi"}')
export AMENITY_2="$(echo "$RESPONSE" | jq -r '.id')"
echo "Amenity ID: $AMENITY_2"

echo -e "\n> Create New Place:"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/places/ -H "Content-Type: application/json" -H "Authorization: Bearer $JWT" -d '{"title": "Nice French Apartment", "description": "Cozy apartment in the center of Toulouse", "price": 225.0, "latitude": 85, "longitude": 125, "owner_id": "'"$OWNER"'", "rooms": 3, "capacity": 4, "surface": 55.5, "amenities": [{"id": "'"$AMENITY_1"'"}, {"id": "'"$AMENITY_2"'"}]}')
export PLACE="$(echo "$RESPONSE" | jq -r '.id')"
echo "Place ID: $PLACE"

echo -e "\n> Create New Reviews:"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/reviews/ -H "Content-Type: application/json" -H "Authorization: Bearer $JWT" -d '{"title": "Great place!", "text": "I had a very good time in Toulouse. Hope to come back soon!", "rating": 4, "user_id": "'"$OWNER"'", "place_id": "'"$PLACE"'"}')
export REVIEW_1="$(echo "$RESPONSE" | jq -r '.id')"
echo "Review ID: $REVIEW_1"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/reviews/ -H "Content-Type: application/json" -H "Authorization: Bearer $JWT" -d '{"title": "Hot and noisy...", "text": "Great city, but the apartment lacks air conditioning and the neighbours were pretty loud!", "rating": 2, "user_id": "'"$OWNER"'", "place_id": "'"$PLACE"'"}')
export REVIEW_2="$(echo "$RESPONSE" | jq -r '.id')"
echo "Review ID: $REVIEW_2"
