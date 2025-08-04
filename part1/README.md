# Part 1: Technical Documentation

This first part of the HBnB project focuses on defining the architecture of the application and creating its technical documentation. It aims at understanding and representing the different classes that will be managed in the project: Users, Places, Amenities and Reviews.

## Objectives

* Creating a comprehensive technical documentation for the HBnB Evolution architecture
* Understanding entities relationships and the importance of identifying them with a unique ID.
* Defining attributes that will be implemented for each class.

## Architecture & Layers

To handle operations properly, the application will follow a layered architecture. It will be divided into:

- A Presentation Layer, allowing users to interact with data from a web interface.
- A Business Logic Layer, that will handle API endpoints to manage operations and permissions.
- A Persistence Layer, consisting in a database to store information with persistence.

## Directory Structure

| File | Description |
| :---- | :---------- |
| [`docs/`](https://github.com/gwendalminguy/holbertonschool-hbnb/tree/main/part1/docs/) | Directory containg the documentation. |
| [`medias/`](https://github.com/gwendalminguy/holbertonschool-hbnb/tree/main/part1/media/) | Directory containing media files. |

## Tasks

**0. High-Level Package Diagram**
- Creating a high-level package diagram that illustrates the three-layer architecture of the application and the communication between these layers via the facade pattern.

**1. Class Diagram for Business Logic Layer**
- Designing a detailed class diagram for the Business Logic layer, focusing on the User, Place, Review, and Amenity entities, including their attributes, methods, and relationships.

**2. Sequence Diagrams for API Calls**
- Developping sequence diagrams for four different API calls to show the interaction between the layers and the flow of information.

**3. Documentation Compilation**
- Compiling all diagrams and explanatory notes into a comprehensive technical document.

## Resources

* [UML Basics](https://github.com/Mornac/holbertonschool-hbnb/blob/main/media/png/OOP%20-%20Introduction%20to%20UML%20Public.pdf)
* [UML Package Diagram Overview](https://www.uml-diagrams.org/package-diagrams.html)  
* [UML Package Diagram Guide](https://www.visual-paradigm.com/guide/uml-unified-modeling-language/what-is-package-diagram/)
* [UML Class Diagram Tutorial](https://creately.com/blog/software-teams/class-diagram-tutorial/)
* [UML Sequence Diagram Tutorial](https://creately.com/guides/sequence-diagram-tutorial/)
* [Understanding Sequence Diagrams](https://www.uml-diagrams.org/sequence-diagrams.html)
* [Mermaid](http://mermaid.js.org/)
