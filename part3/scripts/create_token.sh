#!/bin/bash

echo -e "\n> Create New User:"
curl -X POST http://localhost:5000/api/v1/users/ -H "Content-Type: application/json" -d '{
	"first_name": "Jane",
	"last_name": "Doe",
	"email": "jane.doe@example.com",
	"password": "abcd1234",
	"is_admin": "True"
}'

echo -e "\n> Create Token:"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/auth/login -H "Content-Type: application/json" -d '{
	"email": "jane.doe@example.com",
	"password": "abcd1234"
}')
export JWT="$(echo "$RESPONSE" | jq -r '.access_token')"
echo "Access Token: $JWT"

echo -e "\n> Access Protected Route:"
curl -X GET http://127.0.0.1:5000/api/v1/auth/protected -H "Authorization: Bearer $JWT"
