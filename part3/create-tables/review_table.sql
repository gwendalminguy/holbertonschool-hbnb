CREATE TABLE IF NOT EXISTS Review (
    id CHAR(36) PRIMARY KEY,
    title TEXT, NOT NULL,
    text TEXT, NOT NULL,
    Rating INTEGER CHECK (Rating >= 1 AND Rating <= 5),
    user_id CHAR(36) NOT NULL, Foreign Key referencing User(id)
    place_id CHAR(36) NOT NULL, Foreign Key referencing Place(id)
    UNIQUE (user_id, place_id)
);
