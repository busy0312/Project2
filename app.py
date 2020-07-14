# import necessary libraries
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect,
    url_for)
# from config import SQL_key, Local_SQL_URI

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

from flask_sqlalchemy import SQLAlchemy

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL') or f'postgresql+psycopg2://postgres:{SQL_key}@localhost:5432/animals_db'
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL') or Local_SQL_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '')
db = SQLAlchemy(app)
print(db.Model.metadata)
db.Model.metadata.reflect(bind=db.engine)

class Animal(db.Model):
    '''deal with an existing table'''
    __table__ = db.Model.metadata.tables['austin_animals']
#     __table__ = db.Model.metadata.tables['austin_animals_db']

# results = db.session.query(Animal.Name).all()
# print(results)

# from .models import Pet
# create route that renders index.html template
@app.route("/")
def home():
    results = db.session.query(Animal.Age_upon_Intake).all()
    return render_template("index.html", results = jsonify(results))

@app.route("/getData")
def getData():
    results = []
    queryList = [Animal.Animal_ID,
	Animal.Name,
    Animal.DateTime_Outcome,
    Animal.Date_of_Birth,
    Animal.Outcome_Type,
    Animal.Animal_Type,
    Animal.Sex_upon_Outcome,
    Animal.Age_upon_Outcome,
    Animal.Breed,
    Animal.Color,
    Animal.DateTime_Intake,
    Animal.Found_Location, 
    Animal.Intake_Type, 
    Animal.Age_upon_Intake, 
    Animal.Age_upon_Outcome_days, 
    Animal.Age_upon_Intake_days]

    
    for row in db.session.query(*queryList).all():
        results.append({"Animal_ID": row[0],
            "Name":row[1],
            "DateTime_Outcome": row[2],
            "Date_of_Birth": row[3],
            "Outcome_Type": row[4],
            "Animal_Type": row[5],
            "Sex_upon_Outcome": row[6],
            "Age_upon_Outcome": row[7],
            "Breed": row[8],
            "Color": row[9],
            "DateTime_Intake": row[10],
            "Found_Location": row[11], 
            "Intake_Type": row[12], 
            "Age_upon_Intake": row[13], 
            "Age_upon_Outcome_days": row[14], 
            "Age_upon_Intake_days": row[15]})
    # print(results)
    return(jsonify(results))



@app.route("/dog")
def dog():
    return render_template("dog.html")
    

@app.route("/cat")
def cat():
    return render_template("cat.html")


@app.route("/comparison")
def comparison():
    return render_template("comparison.html")


@app.route("/data")
def data():
    return render_template("data.html")
    


if __name__ == "__main__":
    app.run()
