# Part 3: Authentication and Database Integration

This third part of the HBnB Project focuses on the implementation of user authentication and authorization, and on the database integration. It consists in securing the backend and introducing persistent storage using Python's SQLAlchemy framework.

## Objectives

1. Implement JWT-based user authentication
2. Replace in-memory storage using ORM
3. Refactor all CRUD operations to interact with a persistent database
4. Design the database schema showing entity relationships
5. Ensure that data validation and constraints are properly enforced in the models

## Project Context

Securing the application and allowing it to scale effectively:
- Introducing JWT-based authentication to secure the API
- Transitioning from in-memory storage to persistent storage with a database

## Learning Objectives

1. Implement JWT authentication to secure your API and manage user sessions.
2. Enforce role-based access control to restrict access based on user roles (regular users and administrators).
3. Replace in-memory repositories with a SQLite-based persistence layer using SQLAlchemy for development and configure MySQL for production.
4. Design and visualize a relational database schema using mermaid.js to handle relationships between users, places, reviews, and amenities.
5. Ensure the backend is secure, scalable, and provides reliable data storage for production environments.

## Directory Structure

| File | Description |
| :---- | :---------- |
| [`app/`](https://github.com/gwendalminguy/holbertonschool-hbnb/tree/main/part3/app/) | The directory containg the HBnB application. |
| [`scripts/`](https://github.com/gwendalminguy/holbertonschool-hbnb/tree/main/part3/scripts/) | The directory containing scripts to initialize the database. |
| [`tests/`](https://github.com/gwendalminguy/holbertonschool-hbnb/tree/main/part3/tests/) | The directory containing scripts to test all API routes. |
| [`config.py`](https://github.com/gwendalminguy/holbertonschool-hbnb/tree/main/part3/config.py) | The configuration file for the application. |
| [`diagram.md`](https://github.com/gwendalminguy/holbertonschool-hbnb/tree/main/part3/diagram.md) | The diagram representing entity relationships. |
| [`requirements.txt`](https://github.com/gwendalminguy/holbertonschool-hbnb/tree/main/part3/requirements.txt) | The text file listing requirements for installation. |
| [`run.py`](https://github.com/gwendalminguy/holbertonschool-hbnb/tree/main/part3/run.py) | The python script to run the application. |

## Tasks

**0. Including the Configuration in Application Factory**
- Update the Flask Application Factory to include the configuration object.

**1. Including Password Hashing in User Model**
- Update the User model to securely store a hashed password.
- Modify the user registration endpoint to accept the password field.

**2. Implementing JWT Authentication**
- Set up JWT-based authentication for the HBnB application, enabling secure login functionality.

**3. Implementing Authenticated User Access Endpoints**
- Secure endpoints to ensure only authenticated users can create, update, and delete resources.
- Add logic to validate ownership of places and reviews.
- Implement logic to prevent users from reviewing places they own or reviewing a place multiple times.
- Verify that public users can access the PUBLIC endpoints without a JWT token.

**4. Implementing Administrator Access Endpoints**
- Implement logic for restricting access to specific endpoints based on the user’s role (is_admin).
- Ensure that administrators can manage user accounts, including creating and modifying user details.
- Allow administrators to bypass ownership restrictions for places and reviews.

**5. Implementing SQLAlchemy Repository**
- Create the SQLAlchemy repository that implements the existing repository interface.
- Refactor the existing Facade to utilize the SQLAlchemy-based repository for user operations.
- Provide code and detailed instructions for integration, but no database initialization will be performed yet.

**6. Mapping User Entity to SQLAlchemy Model**
- Map the BaseModel class to a SQLAlchemy model, including the id, created_at and updated_at attributes.
- Map the User entity to a SQLAlchemy model, including attributes like first_name, last_name, email, password, and is_admin.
- Implement the UserRepository class to interact with the database using SQLAlchemy.
- Refactor the Facade to use the UserRepository for user-related operations.

**7. Mapping Place, Review, and Amenity Entities**
- Map the core attributes for Place, Review, and Amenity entities.
- Ensure that each entity has basic CRUD functionality through the repository pattern.
- Follow the same process you used to map the User entity in the previous tasks.

**8. Mapping Relationships Between Entities**
- Map the relationships between the entities using SQLAlchemy.

**9. Creating SQL Scripts for Table Generation and Initial Data**
- Create SQL scripts to generate the entire database schema for the HBnB project.
- Populate the database with initial data, like an administrator user and a few amenities.

**10. Generating Database Diagrams**
- Learn to use Mermaid.js to create ER diagrams.
- Generate diagrams that represent the User, Place, Review, Amenity, and Place_Amenity tables, along with their relationships.
- Ensure consistency in the schema visualization, using Mermaid.js as the primary tool for diagram generation.

## Resources

* [JWT](https://flask-jwt-extended.readthedocs.io/en/stable/)
* [SQLAlchemy](https://docs.sqlalchemy.org/en/14/)
* [SQLite](https://sqlite.org/docs.html)
* [Flask](https://flask.palletsprojects.com/en/stable/)
* [Mermaid](https://mermaid.js.org)
