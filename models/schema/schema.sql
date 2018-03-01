DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL primary key,
    first VARCHAR(100) not null,
    last VARCHAR(100) not null,
    email VARCHAR(150) unique not null,
    hash_pass VARCHAR(300) not null,
    profile_image VARCHAR(300),
    bio VARCHAR(1000),
    background VARCHAR(300),
    created TIMESTAMP
);

DROP TABLE IF EXISTS friend_requests;
CREATE TABLE friend_requests (
    id SERIAL primary key,
    recipient_id INTEGER not null,
    sender_id INTEGER not null,
    status INTEGER
);

-- CREATE TABLE user_profiles (
--     id SERIAL primary key,
--     user_id INTEGER not null,
--     image_url VARCHAR(300)
-- )
