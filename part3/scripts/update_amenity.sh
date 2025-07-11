#!/bin/bash

# USER CREATION
echo -e "\n> Create New User:"
curl -X POST http://localhost:5000/api/v1/users/ -H "Content-Type: application/json" -d '{
	"first_name": "Jane",
	"last_name": "Doe",
	"email": "jane.doe@example.com",
	"password": "abcd1234",
	"is_admin": 1
}'

echo -e "\n> Create Token:"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/auth/login -H "Content-Type: application/json" -d '{
	"email": "jane.doe@example.com",
	"password": "abcd1234"
}')
export JWT="$(echo "$RESPONSE" | jq -r '.access_token')"
echo "Access Token: $JWT"

# AMENITY CREATION
echo -e "\n> Create New Amenity:"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/amenities/ -H "Content-Type: application/json" -H "Authorization: Bearer $JWT" -d '{"name": "Wi-Fi"}')
export AMENITY="$(echo "$RESPONSE" | jq -r '.id')"
echo "Amenity ID: $AMENITY"

# AMENITY RETRIEVAL
echo -e "\n> Get Amenity Details:"
curl -X GET http://localhost:5000/api/v1/amenities/$AMENITY

# AMENITY UPDATE
echo -e "\n> Update Amenity:"
curl -X PUT http://localhost:5000/api/v1/amenities/$AMENITY -H "Content-Type: application/json" -H "Authorization: Bearer $JWT" -d '{"name": "WIFI"}'

# AMENITY RETRIEVAL
echo -e "\n> Get New Amenity Details:"
curl -X GET http://localhost:5000/api/v1/amenities/$AMENITY
