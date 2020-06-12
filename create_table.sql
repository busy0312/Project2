CREATE TABLE Austin_animals (
	"Animal_ID" CHAR(15) PRIMARY KEY NOT NULL,
	"Name" VARCHAR,
    "DateTime_Outcome" Date,
    "Date_of_Birth" Date,
    "Outcome_Type" VARCHAR,
    "Animal_Type" VARCHAR NOT NULL,
    "Sex_upon_Outcome" VARCHAR,
   "Age_upon_Outcome" VARCHAR,
    "Breed" VARCHAR NOT NULL,
    "Color"VARCHAR NOT NULL,
    "DateTime_Intake" Date,
    "Found_Location" VARCHAR,
    "Intake_Type" VARCHAR,
    "Age_upon_Intake" VARCHAR,
    "Age_upon_Outcome_days" VARCHAR,
    "Age_upon_Intake_days" VARCHAR
);

