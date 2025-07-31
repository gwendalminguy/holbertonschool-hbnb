#!/bin/bash

PYTHON=$(which python3)
BACK=$(realpath ./part3/run.py)

# START SERVER
$PYTHON $BACK &
sleep 3

# ADMIN TOKEN
echo -e "\n> Create Admin Token:"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/auth/login -H "Content-Type: application/json" -d '{
	"email": "admin@hbnb.io",
	"password": "admin1234"
}')
export JWT_ADMIN="$(echo "$RESPONSE" | jq -r '.access_token')"
echo "Access Token: $JWT_ADMIN"

# OWNER CREATION
echo -e "\n> Create New User (Place Owner):"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/users/ -H "Content-Type: application/json" -d '{
	"first_name": "Frank Lloyd",
	"last_name": "Wright",
	"email": "franklloyd.wright@example.com",
	"password": "abcd1234"
}')
export OWNER="$(echo "$RESPONSE" | jq -r '.id')"
echo "Place Owner ID: $OWNER"

# OWNER TOKEN
echo -e "\n> Create Owner Token:"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/auth/login -H "Content-Type: application/json" -d '{
	"email": "franklloyd.wright@example.com",
	"password": "abcd1234"
}')
export JWT_OWNER="$(echo "$RESPONSE" | jq -r '.access_token')"
# echo "Access Token: $JWT_OWNER"

# PLACES CREATION
echo -e "\n> Create New Places:"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/places/ -H "Content-Type: application/json" -H "Authorization: Bearer $JWT_OWNER" -d '{"title": "Fallingwater House", "description": "Beautiful house designed by American architect Frank Lloyd Wright, partly built over a waterfall on the Bear Run stream.", "price": 899.0, "latitude": 39.9, "longitude": -79.5, "owner_id": "'"$OWNER"'", "rooms": 11, "capacity": 8, "surface": 158.0, "amenities": [{"id": "4104a0cc-3128-4639-8cbf-ebe56a32b84a"}, {"id": "1fcee8b6-64bc-461d-bb88-0f7697f3a920"}, {"id": "fd12747f-d73f-4f51-88f6-aff377faec9e"}, {"id": "15650aed-dc4a-434e-af46-2771c5a4bf0a"}, {"id": "5fd71d38-851d-41c5-a530-34d2e44a2967"}]}')
export PLACE_1="$(echo "$RESPONSE" | jq -r '.id')"
echo "Place ID: $PLACE_1"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/places/ -H "Content-Type: application/json" -H "Authorization: Bearer $JWT_OWNER" -d '{"title": "Oregon Cottage", "description": "Nice cottage with mountains view located in southern Oregon countryside.", "price": 249.0, "latitude": 44.0, "longitude": -120.5, "owner_id": "'"$OWNER"'", "rooms": 4, "capacity": 4, "surface": 64.0, "amenities": [{"id": "1fcee8b6-64bc-461d-bb88-0f7697f3a920"}, {"id": "910da42e-cf77-44d6-8383-18bcb192961c"}, {"id": "15650aed-dc4a-434e-af46-2771c5a4bf0a"}]}')
export PLACE_2="$(echo "$RESPONSE" | jq -r '.id')"
echo "Place ID: $PLACE_2"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/places/ -H "Content-Type: application/json" -H "Authorization: Bearer $JWT_OWNER" -d '{"title": "Villa Mairea", "description": "Luxuous villa designed by Finnish modernist architect Alvar Aalto, built out of wood, brick and stone. A beautiful rural retreat in the heart of the Noormarkku province in Finland.", "price": 599.0, "latitude": 61.6, "longitude": 21.9, "owner_id": "'"$OWNER"'", "rooms": 14, "capacity": 8, "surface": 250.0, "amenities": [{"id": "fd12747f-d73f-4f51-88f6-aff377faec9e"}, {"id": "1fcee8b6-64bc-461d-bb88-0f7697f3a920"}, {"id": "910da42e-cf77-44d6-8383-18bcb192961c"}, {"id": "ac97ecf8-d04a-4958-a31e-219f1729f3f6"}, {"id": "ffa60235-d7e4-40cb-910e-a00fe9cc22d4"}]}')
export PLACE_3="$(echo "$RESPONSE" | jq -r '.id')"
echo "Place ID: $PLACE_3"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/places/ -H "Content-Type: application/json" -H "Authorization: Bearer $JWT_OWNER" -d '{"title": "New York Loft", "description": "Luxuous and spacious loft in New York City, on the sixteenth floor of one of the most comfortable building, close to Central Park.", "price": 649.0, "latitude": 40.7, "longitude": -73.9, "owner_id": "'"$OWNER"'", "rooms": 5, "capacity": 6, "surface": 92.0, "amenities": [{"id": "4104a0cc-3128-4639-8cbf-ebe56a32b84a"}, {"id": "a0de5556-c903-49ee-8104-e9a77303c7fc"}, {"id": "fd12747f-d73f-4f51-88f6-aff377faec9e"}, {"id": "5fd71d38-851d-41c5-a530-34d2e44a2967"}]}')
export PLACE_4="$(echo "$RESPONSE" | jq -r '.id')"
echo "Place ID: $PLACE_4"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/places/ -H "Content-Type: application/json" -H "Authorization: Bearer $JWT_OWNER" -d '{"title": "Parisian Suite", "description": "Authentic Parisian suite with two large bedrooms and Louis XVI furniture, and a beautiful view on the Eiffel Tower from the living room.", "price": 399.0, "latitude": 48.9, "longitude": 2.3, "owner_id": "'"$OWNER"'", "rooms": 4, "capacity": 4, "surface": 65.0, "amenities": [{"id": "a0de5556-c903-49ee-8104-e9a77303c7fc"}, {"id": "4104a0cc-3128-4639-8cbf-ebe56a32b84a"}, {"id": "5fd71d38-851d-41c5-a530-34d2e44a2967"}, {"id": "445bc912-6914-4802-b196-8815d4ded273"}, {"id": "ac97ecf8-d04a-4958-a31e-219f1729f3f6"}]}')
export PLACE_5="$(echo "$RESPONSE" | jq -r '.id')"
echo "Place ID: $PLACE_5"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/places/ -H "Content-Type: application/json" -H "Authorization: Bearer $JWT_OWNER" -d '{"title": "Casa Malaparte", "description": "Beautiful and spacious villa in built on a massive rock in Capri, with a rooftop and a panoramic view on the Mediterranean sea.", "price": 759.0, "latitude": 40.6, "longitude": 14.2, "owner_id": "'"$OWNER"'", "rooms": 16, "capacity": 12, "surface": 265.0, "amenities": [{"id": "4104a0cc-3128-4639-8cbf-ebe56a32b84a"}, {"id": "fd12747f-d73f-4f51-88f6-aff377faec9e"}, {"id": "5fd71d38-851d-41c5-a530-34d2e44a2967"}, {"id": "445bc912-6914-4802-b196-8815d4ded273"}, {"id": "ac97ecf8-d04a-4958-a31e-219f1729f3f6"}]}')
export PLACE_6="$(echo "$RESPONSE" | jq -r '.id')"
echo "Place ID: $PLACE_6"

# USER 1 CREATION
echo -e "\n> Create New User (Reviewing User):"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/users/ -H "Content-Type: application/json" -d '{
	"first_name": "Alvar",
	"last_name": "Aalto",
	"email": "alvar.aalto@example.com",
	"password": "abcd1234"
}')
export USER_1="$(echo "$RESPONSE" | jq -r '.id')"
echo "Reviewing User ID: $USER_1"

# USER 1 TOKEN
echo -e "\n> Create User Token:"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/auth/login -H "Content-Type: application/json" -d '{
	"email": "alvar.aalto@example.com",
	"password": "abcd1234"
}')
export JWT_USER_1="$(echo "$RESPONSE" | jq -r '.access_token')"
# echo "Access Token: $JWT_USER_1"

# USER 2 CREATION
echo -e "\n> Create New User (Reviewing User):"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/users/ -H "Content-Type: application/json" -d '{
	"first_name": "Louis",
	"last_name": "Kahn",
	"email": "louis.kahn@example.com",
	"password": "ABCD1234"
}')
export USER_2="$(echo "$RESPONSE" | jq -r '.id')"
echo "Reviewing User ID: $USER_2"

# USER 2 TOKEN
echo -e "\n> Create User Token:"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/auth/login -H "Content-Type: application/json" -d '{
	"email": "louis.kahn@example.com",
	"password": "ABCD1234"
}')
export JWT_USER_2="$(echo "$RESPONSE" | jq -r '.access_token')"
# echo "Access Token: $JWT_USER_2"

# REVIEWS CREATION
echo -e "\n> Create New Reviews:"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/reviews/ -H "Content-Type: application/json" -H "Authorization: Bearer $JWT_USER_1" -d '{"title": "Amazing place!", "text": "I spent a very good time in this beautiful and huge house. The waterfall really makes this place unique in the world!", "rating": 5, "user_id": "'"$USER_1"'", "place_id": "'"$PLACE_1"'"}')
export REVIEW_1="$(echo "$RESPONSE" | jq -r '.id')"
echo "Review ID: $REVIEW_1"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/v1/reviews/ -H "Content-Type: application/json" -H "Authorization: Bearer $JWT_USER_2" -d '{"title": "Beautiful & Quiet", "text": "This house is out of this world. Isolated in the forest, autumn leaves made it a spectacular and very colorful experience.", "rating": 5, "user_id": "'"$USER_2"'", "place_id": "'"$PLACE_1"'"}')
export REVIEW_2="$(echo "$RESPONSE" | jq -r '.id')"
echo "Review ID: $REVIEW_2"

# REVIEWS RETRIEVAL
# echo -e "\n> Get All Reviews From Single Place:"
# curl -X GET http://localhost:5000/api/v1/places/$PLACE/reviews

# STOP SERVER
echo -e "\n> Database Populated!"
fuser -n tcp 5000 | grep -o -E '[0-9]+' | xargs kill
