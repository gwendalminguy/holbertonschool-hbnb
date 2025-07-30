#!/bin/bash

echo -e "\n> Get Places List:"
curl -X GET http://localhost:5000/api/v1/places/
