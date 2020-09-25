-- CREATE DATABASE tango;

DROP TABLE publication;
DROP TABLE field;
DROP TABLE fieldType;
DROP TABLE submission;
DROP TABLE form CASCADE;

CREATE TABLE form(
    form_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    PRIMARY KEY(form_id)
);

CREATE TABLE fieldType(
    type_id INT GENERATED ALWAYS AS IDENTITY,
    description VARCHAR(100) NOT NULL,
    PRIMARY KEY(type_id)
);

CREATE TABLE field(
    field_id INT GENERATED ALWAYS AS IDENTITY,
    form_id INT,
    field_type INT,
    question VARCHAR(255) NOT NULL,
    options VARCHAR(100) [],
    isActive BOOLEAN DEFAULT TRUE,
    isMendotary BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(field_id),
    CONSTRAINT fk_form
      FOREIGN KEY(form_id) 
	  REFERENCES form(form_id),
    CONSTRAINT fk_fieldType
      FOREIGN KEY(field_type) 
	  REFERENCES fieldType(type_id)
);

CREATE TABLE publication(
    publication_id INT GENERATED ALWAYS AS IDENTITY,
    form_id INT,
    link VARCHAR(100) NOT NULL,
    isSubmitted BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(publication_id),
    CONSTRAINT fk_form
      FOREIGN KEY(form_id) 
	  REFERENCES form(form_id)
);

CREATE TABLE submission(
    submission_id INT GENERATED ALWAYS AS IDENTITY,
    form_id INT,
    contents JSON NOT NULL,
    PRIMARY KEY(submission_id),
    CONSTRAINT fk_form
      FOREIGN KEY(form_id) 
	  REFERENCES form(form_id)
);

CREATE TABLE orders (
	id serial NOT NULL PRIMARY KEY,
	info json NOT NULL
);

INSERT INTO fieldType(description)
VALUES('Short-answer Question'),('Long-answer Question'),('Multiple Choices');	   