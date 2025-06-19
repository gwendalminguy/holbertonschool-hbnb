#!/bin/bash

echo -e "\n> Create New Amenity:"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/amenities/ -H "Content-Type: application/json" -d '{"name": "Wi-Fi"}')
export AMENITY="$(echo "$RESPONSE" | jq -r '.id')"
echo "Amenity ID: $AMENITY"

echo -e "\n> Update Amenity:"
curl -X PUT http://localhost:5000/api/v1/amenities/$AMENITY -H "Content-Type: application/json" -d '{"name": "WIFI"}'
