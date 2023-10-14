CREATE TABLE user_info (
    id uuid DEFAULT gen_random_uuid (),
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email_id VARCHAR NOT NULL UNIQUE,
    phone_number VARCHAR NOT NULL UNIQUE,
    PRIMARY KEY (id)
);