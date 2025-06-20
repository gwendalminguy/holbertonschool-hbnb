#!/bin/bash

echo -e "\n> Create New Users:"
curl -X POST http://localhost:5000/api/v1/users/ -H "Content-Type: application/json" -d '{"first_name": "Hugo", "last_name": "Chilemne", "email": "hugo.chilemne@example.com"}'
curl -X POST http://localhost:5000/api/v1/users/ -H "Content-Type: application/json" -d '{"first_name": "Fabien", "last_name": "Chavonet", "email": "fabien.chavonet@example.com"}'
