export const getAllJotcRequest = `
    SELECT
    id, 
    email, 
    jotc_input, 
    jotc_result, 
    created_at 
    FROM jotc_requests 
    ORDER BY created_at DESC`;

export const insertJotcRequest = `
    INSERT INTO jotc_requests (
        email, 
        jotc_input, 
        jotc_result
    ) VALUES (?, ?, ?)`;

export const getUsersByEmail = `
    SELECT * FROM users WHERE email = ?`;

export const initialQuery = `
    PRAGMA foreign_keys=OFF;
    BEGIN TRANSACTION;

    CREATE TABLE IF NOT EXISTS "users" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "jotc_requests" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "jotc_input" TEXT NOT NULL,
    "jotc_result" INTEGER,
    "created_at" TEXT DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO users (name, email, password, role) 
    SELECT 'admin', 'admin@domain.com', '$2b$10$QtBSy2staMekjodKfF.vOuqgibgJSNKd8Y6vPOer0HDoKisSTXQ/2', 'admin' 
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@domain.com');

    COMMIT;
`;