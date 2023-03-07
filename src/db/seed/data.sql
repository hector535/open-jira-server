CREATE TABLE IF NOT EXISTS status (
	status_id SERIAL PRIMARY KEY,
	name VARCHAR(50) UNIQUE NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
	user_id SERIAL PRIMARY KEY,
	email VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tasks (
	task_id SERIAL PRIMARY KEY,
	description VARCHAR(500) NOT NULL,
	user_id INT NOT NULL,
	status_id SMALLINT NOT NULL DEFAULT 1,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	
	FOREIGN KEY (user_id)
		REFERENCES users (user_id),
	
	FOREIGN KEY(status_id)
		REFERENCES status (status_id)
);

INSERT INTO status (name) VALUES ('pending');
INSERT INTO status (name) VALUES ('in-progress');
INSERT INTO status (name) VALUES ('finished');
