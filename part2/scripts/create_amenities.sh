#!/bin/bash

echo -e "\n> Create New Amenities:"
curl -X POST http://localhost:5000/api/v1/amenities/ -H "Content-Type: application/json" -d '{"name": "TV"}'
curl -X POST http://localhost:5000/api/v1/amenities/ -H "Content-Type: application/json" -d '{"name": "Wi-Fi"}'
curl -X POST http://localhost:5000/api/v1/amenities/ -H "Content-Type: application/json" -d '{"name": "Air Conditioning"}'
