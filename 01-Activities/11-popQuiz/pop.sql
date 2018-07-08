DROP TABLE IF EXISTS favorite_soda;

CREATE TABLE favorite_soda (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  caffeine DECIMAL (10,0) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO favorite_soda (name, caffeine, price)
VALUES ("Coke", 45, 1.79);

INSERT INTO favorite_soda (name, caffeine, price)
VALUES ("Mountain Dew", 73, 1.49);

INSERT INTO favorite_soda (name, caffeine, price)
VALUES ("Dr. Pepper", 55, 1.59);

SELECT * FROM favorite_soda;