-- SQLite
SELECT *
FROM members;

-- UPDATE 'members' SET 'username' = 'iamjames' WHERE 'username' = 'john'

-- SELECT *  FROM `members`

/*
CREATE TABLE `members` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL,
    `username` varchar(65 ) UNIQUE NOT NULL DEFAULT '',
    `email` varchar(65) UNIQUE NOT NULL,
    `password` LONGTEXT NOT NULL DEFAULT '', 
    `verified` tinyint(1) NOT NULL DEFAULT '0',
    `mod_timestamp` INTEGER NOT NULL
)
*/