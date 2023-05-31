from flask import Flask, g, jsonify, render_template, request, redirect, url_for, flash
from flask_cors import CORS
from pymongo import MongoClient, InsertOne
from bson.objectid import ObjectId
import json
from neo4j import GraphDatabase
from neo4j.exceptions import Neo4jError

app = Flask(__name__)
CORS(app)

NEO4J_URI = 'neo4j+s://e7b09531.databases.neo4j.io'
NEO4J_USERNAME = 'neo4j'
NEO4J_PASSWORD = 'R89j_ihUVF5Y9DzIi-aQ1cbEasgLiOvhudaHztXHtfM'


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


def create_node_query(labels, properties):
    labels_str = ":".join(labels)
    formatted_properties = {
        key: f"'{value}'" if isinstance(value, str) else str(value)
        for key, value in properties.items()
    }
    property_str = ", ".join(
        f"{key}: {value}" for key, value in formatted_properties.items())
    query = f"CREATE (n:{labels_str} {{{property_str}}})"

    return query


@app.route('/create_node', methods=['POST'])
def create_node():
    session = get_neo4j_session()
    data = request.get_json()
    query = create_node_query(data['labels'], data['properties'])
    result = session.run(query, data['properties'])
    node = [dict(record['n']) for record in result]
    return jsonify(node)


if __name__ == '__main__':
    app.run(debug=True)
