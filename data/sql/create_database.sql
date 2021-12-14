CREATE TABLE tags (
	id INTEGER auto_increment NOT NULL,
	tag_name varchar(100) NOT NULL,
	tag_value varchar(100) NOT NULL,
	keywords varchar(200) NULL,
	is_skill BOOL DEFAULT 1 NULL,
	CONSTRAINT tags_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;
