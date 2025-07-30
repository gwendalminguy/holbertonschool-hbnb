<p align=center>
    <img src="part1/media/logo.png" width="250">
</p>

<h1 align="center">
    HBnB Evolution<br>Holberton School Toulouse
</h1>

Welcome to the HBnB Evolution project!

In this project, our goal was recreate a custom version of the famous AirBnB website. We worked as a team to develop a simplified version the applicaiton, by creating different layers to set a functional API handling Users, Places, Reviews and Amenities operations.

## 📂 Project Structure

The project contains several files and directories, which are the following:

| Files | Description |
| :---- | :---------- |
| [`Part 1`](https://github.com/gwendalminguy/holbertonschool-hbnb/tree/main/part1) | Technical Documentation |
| [`Part 2`](https://github.com/gwendalminguy/holbertonschool-hbnb/tree/main/part2) | Implementation of Business Logic and API Endpoints |
| [`Part 3`](https://github.com/gwendalminguy/holbertonschool-hbnb/tree/main/part3) | Authentication and Database Integration |
| [`Part 4`](https://github.com/gwendalminguy/holbertonschool-hbnb/tree/main/part4) | Simple Web Client |

## ⚙️ Installation

In order to install HBnB, the three steps of this guide must be followed:

**1. Cloning the repository**

To use HBnB, this repository must be cloned locally, using the following command:

```
$ git clone https://github.com/gwendalminguy/holbertonschool-hbnb.git
```

**2. Setting a virtual environment**

Setting a virtual environment is necessary before installing the requirements, and must be done at the root of the HBnB directory. This will prevent from installing libraries globally, to avoid potential conflicts. It will also help ensure each library is installed with the right version. Setting a virtual environment can be achieved using the following commands:

```
$ cd holbertonschool-hbnb/
$ python3 -m venv venv
$ source venv/bin/activate
```

**3. Installing the requirements**

In order to work, HBnB needs all the libraries from the `requirements.txt` file. They can be installed with the following command:

```
$ pip install -r part3/requirements.txt
```

## 🖥️ Usage

In order to use HBnB through a web interface, a server needs to be launched at the root of the HBnB directory, to let the backend part work:

```
$ python3 part3/run.py
```

Then, running the following command from another terminal will allow the frontend part to be displayed:

```
$ python3 -m http.server -d part4
```

The following URL should then be copied into any web browser:

```
http://localhost:8000/
```

## 🔧 Technologies Used

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-419696?style=for-the-badge&logo=flask&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-C82828?style=for-the-badge&logo=sqlalchemy&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML](https://img.shields.io/badge/HTML-E34f26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-CC6699?style=for-the-badge&logo=css&logoColor=white)
![VS Code](https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=vscode&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-333333?style=for-the-badge&logo=linux&logoColor=white)

## 🧑‍🤝‍🧑 Authors

This project was carried out by:

- [Gwendal Minguy-Pèlerin](https://github.com/gwendalminguy/)
- [Ingrid Mornac](https://github.com/Mornac/)
