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


CREATE TABLE tag_courses (
	id INTEGER NOT NULL,
	tag_id INTEGER NOT NULL,
	name varchar(200) NOT NULL,
	url varchar(200) NOT NULL,
	thumbnail_url varchar(200) NOT NULL,
	priority SMALLINT DEFAULT 0 NOT NULL,
	CONSTRAINT tag_courses_PK PRIMARY KEY (id),
	CONSTRAINT tag_courses_FK FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;
