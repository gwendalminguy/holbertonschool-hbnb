#!/bin/bash

echo -e "\n> Get Users List:"
curl -X GET http://localhost:5000/api/v1/users/
