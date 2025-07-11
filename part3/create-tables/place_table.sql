CREATE TABLE IF NOT EXISTS place (
    id CHAR(36) PRIMARY KEY (UUID format), NOT NULL,
    title VARCHAR(255), NOT NULL,
    description TEXT, NOT NULL,
    price DECIMAL(10, 2), NOT NULL,
    latitude FLOAT, NOT NULL,
    longitude FLOAT, NOT NULL,
    rooms INTEGER, NOT NULL,
    capacity INTEGER, NOT NULL,
    surface FLOAT, NOT NULL,
    owner_id CHAR(36) Foreign Key referencing User(id), NOT NULL
);