from flask import Flask, g, jsonify, render_template, request, redirect, url_for, flash
from flask_cors import CORS
from pymongo import MongoClient, InsertOne
from bson.objectid import ObjectId
import json
from neo4j import GraphDatabase
from neo4j.exceptions import Neo4jError

app = Flask(__name__)
CORS(app)

NEO4J_URI = 'neo4j+s://6e27ab82.databases.neo4j.io'
NEO4J_USERNAME = 'neo4j'
NEO4J_PASSWORD = 'yanRaZc9FOZQsteuES2-g9F4lJ7X2bJIyU_c1FmSWN0'
# AURA_INSTANCEID=6e27ab82
# AURA_INSTANCENAME=Instance01


def get_neo4j_driver():
    if 'neo4j_driver' not in g:
        g.neo4j_driver = GraphDatabase.driver(
            NEO4J_URI, auth=(NEO4J_USERNAME, NEO4J_PASSWORD)
        )
    return g.neo4j_driver


def get_neo4j_session():
    if 'neo4j_session' not in g:
        g.neo4j_session = get_neo4j_driver().session()
    return g.neo4j_session


@app.before_request
def before_request():
    g.neo4j_driver = get_neo4j_driver()
    g.neo4j_session = get_neo4j_session()


@app.route('/nodes')
def get_nodes():
    session = get_neo4j_session()
    result = session.run('MATCH (n) RETURN n')
    nodes = [dict(record['n']) for record in result]
    return jsonify(nodes)


if __name__ == '__main__':
    app.run(debug=True)
