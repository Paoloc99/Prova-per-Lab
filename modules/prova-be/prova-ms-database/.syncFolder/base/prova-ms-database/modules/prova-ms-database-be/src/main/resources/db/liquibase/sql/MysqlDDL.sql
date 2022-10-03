
CREATE TABLE product (
	product_id INTEGER NOT NULL,
	product_name VARCHAR(80),
	cost INTEGER,
	disponibility INTEGER,
	description VARCHAR(80),
	image VARCHAR(80)
);
ALTER TABLE product
	ADD PRIMARY KEY (product_id);

