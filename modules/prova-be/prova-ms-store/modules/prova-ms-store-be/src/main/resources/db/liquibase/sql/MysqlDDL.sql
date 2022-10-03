
CREATE TABLE utente (
	utente_id INTEGER NOT NULL,
	name VARCHAR(80),
	surname VARCHAR(80),
	email VARCHAR(80),
	oauth_id INTEGER,
	is_admin BOOLEAN
);
CREATE TABLE product (
	product_id INTEGER NOT NULL
);
CREATE TABLE ordine (
	ordine_id INTEGER NOT NULL,
	date DATE,
	total_cost INTEGER,
	address VARCHAR(80),
	utente_id INTEGER NOT NULL
);
CREATE TABLE order_item (
	amount INTEGER,
	ordine_id INTEGER NOT NULL,
	product_id INTEGER NOT NULL
);
ALTER TABLE utente
	ADD PRIMARY KEY (utente_id);
ALTER TABLE product
	ADD PRIMARY KEY (product_id);
ALTER TABLE ordine
	ADD PRIMARY KEY (ordine_id);
ALTER TABLE order_item
	ADD PRIMARY KEY (ordine_id, product_id);
ALTER TABLE ordine
	ADD CONSTRAINT FK_ordine__utente FOREIGN KEY (utente_id) REFERENCES utente(utente_id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE order_item
	ADD CONSTRAINT FK_order_item__ordine FOREIGN KEY (ordine_id) REFERENCES ordine(ordine_id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE order_item
	ADD CONSTRAINT FK_order_item__product FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE ON UPDATE CASCADE;

