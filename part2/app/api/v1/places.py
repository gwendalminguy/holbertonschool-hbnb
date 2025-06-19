from flask_restx import Namespace, Resource, fields
from app.services import facade

api = Namespace('places', description='Place operations')


amenity_model = api.model('PlaceAmenity', {
    'id': fields.String(description='Amenity ID'),
    'name': fields.String(description='Name of the amenity')
})

user_model = api.model('PlaceUser', {
    'id': fields.String(description='User ID'),
    'first_name': fields.String(description='First name of the owner'),
    'last_name': fields.String(description='Last name of the owner'),
    'email': fields.String(description='Email of the owner')
})
 
review_model = api.model('PlaceReview', {
    'id': fields.String(description='Review ID'),
    'title': fields.String(description='Title of the review'),
    'text': fields.String(description='Text of the review'),
    'rating': fields.Integer(description='Rating of the place (1-5)'),
    'user_id': fields.String(description='ID of the user')
    })

place_model = api.model('Place', {
    'title': fields.String(required=True, description='Title of the place'),
    'description': fields.String(description='Description of the place'),
    'price': fields.Float(required=True, description='Price per night'),
    'latitude': fields.Float(required=True, description='Latitude of the place'),
    'longitude': fields.Float(required=True, description='Longitude of the place'),
    'owner_id': fields.String(required=True, description='ID of the owner'),
    'owner': fields.Nested(user_model, description='Owner of the place'),
    'rooms': fields.Integer(required=True, description='Number of rooms of the place'),
    'capacity': fields.Integer(description='Maximum number of people allowed'),
    'surface': fields.Float(description='Surface of the place'),
    'amenities': fields.List(fields.String, required=True, description="List of amenities ID's"),
    'reviews': fields.List(fields.String, description="List of reviews ID's")
})


@api.route('/')
class PlaceList(Resource):
    @api.expect(place_model)
    @api.response(201, 'Place successfully created')
    @api.response(400, 'Invalid input data')
    def post(self):
        """
        Register a new place
        """
        place_data = api.payload

        existing_user = facade.get_user(place_data["owner_id"])
        if not existing_user:
            return {'error': 'User not found'}, 404

        try:
            new_place = facade.create_place(place_data)
        except ValueError:
            return {'error': 'Invalid input data'}, 400
        else:
            return {
                'id': new_place.id,
                'title': new_place.title,
                'description': new_place.description,
                'price': new_place.price,
                'latitude': new_place.latitude,
                'longitude': new_place.longitude,
                'owner_id': new_place.owner_id,
                'rooms': new_place.rooms,
                'capacity': new_place.capacity,
                'surface': new_place.surface,
                'amennities': new_place.amenities
            }, 201

    @api.response(200, 'List of places retrieved successfully')
    def get(self):
        """
        Retrieve a list of all places
        """
        place_list = facade.get_all_places()
        places = []
        if len(place_list) == 0:
            return {'error': 'No place found'}, 404
        for place in place_list:
            places.append({
                'id': place.id,
                'title': place.title,
                'description': place.description,
                'price': place.price,
                'latitude': place.latitude,
                'longitude': place.longitude,
                'owner_id': place.owner_id,
                'rooms': place.rooms,
                'capacity': place.capacity,
                'surface': place.surface,
            })
        return places, 200


@api.route('/<place_id>')
class PlaceResource(Resource):
    @api.response(200, 'Place details retrieved successfully')
    @api.response(404, 'Place not found')
    def get(self, place_id):
        """
        Get place details by ID
        """
        place = facade.get_place(place_id)
        owner = facade.get_user(place.owner_id)
        
        amenities_list = [facade.get_amenity(amenity) for amenity in place.amenities]

        amenities = [{
            "id": instance.id,
            "name": instance.name
        } for instance in amenities_list]

        if not place:
            return {'error': 'Place not found'}, 404
        return {
            'id': place.id,
            'title': place.title,
            'description': place.description,
            'price': place.price,
            'latitude': place.latitude,
            'longitude': place.longitude,
            'owner': {
                "id": owner.id,
                "first_name": owner.first_name,
                "last_name": owner.last_name,
                "email": owner.email
            },
            'rooms': place.rooms,
            'capacity': place.capacity,
            'surface': place.surface,
            'amenities': amenities
        }, 200

    @api.expect(place_model)
    @api.response(200, 'Place updated successfully')
    @api.response(404, 'Place not found')
    @api.response(400, 'Invalid input data')
    def put(self, place_id):
        """
        Update a place's information
        """
        place_data = api.payload
        place = facade.get_place(place_id)
        if not place:
            return {'error': 'Place not found'}, 404
        updated_place = facade.update_place(place_id, place_data)
        if not updated_place:
            return {'error': 'Invalid input data'}, 400
        return {
            'id': updated_place.id,
            'title': updated_place.title,
            'description': updated_place.description,
            'price': updated_place.price,
            'latitude': updated_place.latitude,
            'longitude': updated_place.longitude,
            'owner_id': updated_place.owner_id,
            'rooms': updated_place.rooms,
            'capacity': updated_place.capacity,
            'surface': updated_place.surface,
            'reviews': updated_place.reviews,
            'amenities': updated_place.amenities
        }, 200
