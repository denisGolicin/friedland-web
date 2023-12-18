CREATE TABLE codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(255) NOT NULL UNIQUE,
    createdAat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'deleted') NOT NULL
);

--------------------------------------------------------------
INSERT INTO codes (code, status) VALUES
    ('456835', 'active'),
    ('123567', 'active'),
    ('123456', 'active'),
    ('684390', 'deleted'),
    ('485356', 'active');