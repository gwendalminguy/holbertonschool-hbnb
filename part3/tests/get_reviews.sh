#!/bin/bash

echo -e "\n> Get Reviews List:"
curl -X GET http://localhost:5000/api/v1/reviews/
