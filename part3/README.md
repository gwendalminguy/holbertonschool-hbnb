# Part 3: Authentication and Database Integration

This third part of the HBnB Project focuses on the implementation of user authentication and authorization, and on the database integration. It consists in securing the backend and introducing persistent storage using Python's SQLAlchemy framework.

## Objectives

* Implementing JWT-based user authentication
* Replacing in-memory storage with persistence using ORM
* Refactoring all CRUD operations to interact with a database
* Designing the database schema showing entity relationships

## Directory Structure

| File | Description |
| :---- | :--------- |
| [`app/`](https://github.com/gwendalminguy/holbertonschool-hbnb/tree/main/part3/app/) | Directory containg the HBnB application. |
| [`scripts/`](https://github.com/gwendalminguy/holbertonschool-hbnb/tree/main/part3/scripts/) | Directory containing scripts to initialize the database. |
| [`tests/`](https://github.com/gwendalminguy/holbertonschool-hbnb/tree/main/part3/tests/) | Directory containing scripts to test all API routes. |
| [`config.py`](https://github.com/gwendalminguy/holbertonschool-hbnb/tree/main/part3/config.py) | Configuration file for the application. |
| [`diagram.md`](https://github.com/gwendalminguy/holbertonschool-hbnb/tree/main/part3/diagram.md) | Entity relationships diagram representing the database schema. |
| [`requirements.txt`](https://github.com/gwendalminguy/holbertonschool-hbnb/tree/main/part3/requirements.txt) | Text file listing requirements for installation. |
| [`run.py`](https://github.com/gwendalminguy/holbertonschool-hbnb/tree/main/part3/run.py) | Python script to run the application. |

## Tasks

**0. Including the Configuration in Application Factory**
- Updating the Flask Application Factory to include the configuration object.

**1. Including Password Hashing in User Model**
- Updating the User model to securely store a hashed password.
- Modifying the user registration endpoint to accept the password field.

**2. Implementing JWT Authentication**
- Setting up JWT-based authentication for the HBnB application, enabling secure login functionality.

**3. Implementing Authenticated User Access Endpoints**
- Securing endpoints to ensure only authenticated users can create, update, and delete resources.
- Adding logic to validate ownership of places and reviews.
- Implementing logic to prevent users from reviewing places they own or reviewing a place multiple times.
- Verifying that public users can access the PUBLIC endpoints without a JWT token.

**4. Implementing Administrator Access Endpoints**
- Implementing logic for restricting access to specific endpoints based on the user’s role.
- Ensuring administrators can manage user accounts, including creating and modifying user details.
- Allowing administrators to bypass ownership restrictions for places and reviews.

**5. Implementing SQLAlchemy Repository**
- Creating the SQLAlchemy repository that implements the existing repository interface.
- Refactoring the existing facade to use the SQLAlchemy-based repository for user operations.

**6. Mapping User Entity to SQLAlchemy Model**
- Mapping the BaseModel class to a SQLAlchemy model, including the id, created_at and updated_at attributes.
- Mapping the User entity to a SQLAlchemy model, including attributes like first_name, last_name, email, password, and is_admin.
- Implementing the UserRepository class to interact with the database using SQLAlchemy.
- Refactoring the facade to use the UserRepository for user-related operations.

**7. Mapping Place, Review, and Amenity Entities**
- Mapping core attributes for Place, Review, and Amenity entities.
- Ensuring that each entity has basic CRUD functionaliy through the repository pattern.

**8. Mapping Relationships Between Entities**
- Mapping the relationships between entities using SQLAlchemy.

**9. Creating SQL Scripts for Table Generation and Initial Data**
- Creating SQL scripts to generate the entire database schema for the HBnB project.
- Populating the database with initial data, like an administrator user and a few amenities.

**10. Generating Database Diagrams**
- Learning to use Mermaid to create ER diagrams.
- Generating diagrams representing User, Place, Review, Amenity, and Place_Amenity tables, along with their relationships.
- Ensuring consistency in the schema visualization, using Mermaid as the primary tool for diagram generation.

## Resources

* [JWT](https://flask-jwt-extended.readthedocs.io/en/stable/)
* [SQLAlchemy](https://docs.sqlalchemy.org/en/14/)
* [SQLite](https://sqlite.org/docs.html)
* [Flask](https://flask.palletsprojects.com/en/stable/)
* [Mermaid](https://mermaid.js.org)
