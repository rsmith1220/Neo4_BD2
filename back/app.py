from flask import Flask, render_template, request, redirect, url_for, flash
from pymongo import MongoClient, InsertOne
from bson.objectid import ObjectId
import json

app = Flask(__name__)
app.secret_key = "llave_secreta"

client = MongoClient(
    f"mongodb+srv://admin:123@cluster0.jholt4h.mongodb.net/?retryWrites=true&w=majority",
    socketTimeoutMS=30000,
)

try:
    # Checquear la conexion a la base de datos
    print(client.list_database_names())
except Exception as e:
    print("Error connecting to the database:", e)

db = client.get_database("moviesDB")
movies = db["movies"]
series = db["series"]
episodes = db["episodes"]


@app.route("/pelicula/<id>")
def pelicula(id):
    movies = db.movies
    movieData = movies.find_one({"_id": ObjectId(id)})

    return render_template(
        "pelicula_select.html",
        movieData=movieData,
    )
