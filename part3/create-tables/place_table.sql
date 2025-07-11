CREATE TABLE IF NOT EXISTS place (
    id CHAR(36) PRIMARY KEY (UUID format),
    title VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2),
    latitude FLOAT,
    longitude FLOAT,
    rooms INTEGER,
    capacity INTEGER,
    surface FLOAT,
    owner_id CHAR(36) Foreign Key referencing User(id)
);