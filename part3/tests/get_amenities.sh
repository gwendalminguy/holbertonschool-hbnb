#!/bin/bash

echo -e "\n> Get Amenities List:"
curl -X GET http://localhost:5000/api/v1/amenities/
