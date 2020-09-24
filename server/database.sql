-- CREATE DATABASE tango;
DROP TABLE IF EXISTS field;
DROP TABLE IF EXISTS form;

CREATE TABLE form(
    form_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    PRIMARY KEY(form_id)
);

CREATE TABLE field(
    field_id INT GENERATED ALWAYS AS IDENTITY,
    form_id INT,
    question VARCHAR(255) NOT NULL,
    options VARCHAR(100) [],
    isActive BOOLEAN DEFAULT TRUE,
    isMendotary BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(field_id),
    CONSTRAINT fk_form
      FOREIGN KEY(form_id) 
	  REFERENCES form(form_id)
);