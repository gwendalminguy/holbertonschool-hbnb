#!/bin/bash

echo -e "\n> Create New User:"
curl -X POST http://localhost:5000/api/v1/users/ -H "Content-Type: application/json" -d '{
	"first_name": "Jane",
	"last_name": "Doe",
	"email": "jane.doe@example.com",
	"password": "abcd1234"
}'

echo -e "\n> Create Token:"
curl -X POST http://localhost:5000/api/v1/auth/login -H "Content-Type: application/json" -d '{
	"email": "jane.doe@example.com",
	"password": "abcd1234"
}'
