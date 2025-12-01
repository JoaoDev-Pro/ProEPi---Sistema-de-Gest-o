-- REPRESENTAÇÃO RELACIONAL DO MODELO NOSQL (FIRESTORE)
-- Apenas para fins de documentação da estrutura de dados.

CREATE TABLE Users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'ADMIN'
);

CREATE TABLE Products (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    photoUrl TEXT, -- Armazenado como Base64 ou URL
    currentStock INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Movements (
    id VARCHAR(255) PRIMARY KEY,
    product_id VARCHAR(255),
    user_id VARCHAR(255),
    type ENUM('IN', 'OUT'),
    quantity INT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Products(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);