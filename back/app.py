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
    driver = get_neo4j_session()
    data = request.get_json()
    # Execute the Cypher query
    with driver.session() as session:
        query = create_node_query(data['labels'], data['properties'])
        result = session.run(query)
        node = [dict(record['n']) for record in result]

    # Close the Neo4j driver
    driver.close()

    return jsonify(node)


def create_relationship_query(de, a, properties, relationship):
    formatted_properties = {
        key: f"'{value}'" if isinstance(value, str) else str(value)
        for key, value in properties.items()
    }
    property_str = ", ".join(
        f"{key}: {value}" for key, value in formatted_properties.items())
    query = f"MATCH (a), (b) WHERE a.name = '{de}' AND b.name = '{a}' CREATE (a)-[r:{relationship} {{{property_str}}}]->(b)"

    return query


@app.route('/create_relationship', methods=['POST'])
def create_relationship():
    driver = get_neo4j_session()
    data = request.get_json()

    # Execute the Cypher query
    with driver.session() as session:
        query = create_relationship_query(
            data['de'], data['a'], data['properties'], data['relationship'])
        result = session.run(query)
        node = [dict(record['n']) for record in result]

    # Close the Neo4j driver
    driver.close()

    return jsonify(node)


@app.route('/get_relation', methods=['POST'])
def get_relationships_as_dictionary():
    # Connect to Neo4j
    driver = get_neo4j_session()

    # Execute the Cypher query
    with driver.session() as session:
        result = session.run(
            "MATCH (a)-[r]->(b) RETURN a.Name AS from, type(r) AS relation, b.Name AS to")

        # Process the query result and store it in a list of dictionaries
        relationships = []
        for record in result:
            relationship = {
                'from': record['from'],
                'relation': record['relation'],
                'to': record['to']
            }
            relationships.append(relationship)

    # Close the Neo4j driver
    driver.close()

    return relationships


def update_node_query(labels, properties, new_properties):
    labels_str = ":".join(labels)
    formatted_properties = {
        key: f"'{value}'" if isinstance(value, str) else str(value)
        for key, value in properties.items()
    }
    property_str = " AND ".join(
        f"n.{key} = {value}" for key, value in formatted_properties.items())

    formatted_new_properties = {
        key: f"'{value}'" if isinstance(value, str) else str(value)
        for key, value in new_properties.items()
    }
    new_property_str = ", ".join(
        f"n.{key} = {value}" for key, value in formatted_new_properties.items())
    query = f"MATCH (n:{labels_str}) WHERE {property_str} SET {new_property_str}"

    return query


@app.route('/update_node', methods=['POST'])
def update_node(labels, properties, new_properties):
    driver = get_neo4j_session()
    # Execute the Cypher query
    with driver.session() as session:
        query = update_node_query(labels, properties, new_properties)
        result = session.run(query)
    driver.close()

    return {'status': "success"}


def update_relationship_query(de, a, properties, relationship):
    formatted_properties = {
        key: f"'{value}'" if isinstance(value, str) else str(value)
        for key, value in properties.items()
    }
    property_str = ", ".join(
        f"r.{key} = {value}" for key, value in formatted_properties.items())
    query = f"MATCH (a)-[r:{relationship}]->(b) WHERE a.name = '{de}' AND b.name = '{a}' SET {property_str}"

    return query


@app.route('/update_relationship', methods=['POST'])
def update_relationship(de, a, properties, relationship):
    driver = get_neo4j_session()
    # Execute the Cypher query
    with driver.session() as session:
        query = update_relationship_query(de, a, properties, relationship)
        result = session.run(query)
    driver.close()

    return {'status': "success"}


def delete_node_properties_query(labels, properties, properties_to_delete):
    labels_str = ":".join(labels)
    formatted_properties = {
        key: f"'{value}'" if isinstance(value, str) else str(value)
        for key, value in properties.items()
    }
    property_str = " AND ".join(
        f"n.{key} = {value}" for key, value in formatted_properties.items())
    properties_to_delete_str = ", ".join(
        f"n.{key}" for key in properties_to_delete)
    query = f"MATCH (n:{labels_str}) WHERE {property_str} REMOVE {properties_to_delete_str}"

    return query


@app.route('/delete_node_properties', methods=['POST'])
def delete_node_properties(labels, properties, properties_to_delete):
    driver = get_neo4j_session()
    # Execute the Cypher query
    with driver.session() as session:
        query = delete_node_properties_query(
            labels, properties, properties_to_delete)
        result = session.run(query)
    driver.close()

    return {'status': "success"}


def delete_relationship_properties_query(de, a, relationship, properties_to_delete):

    formatted_properties_to_delete = ", ".join(
        f"r.{key}" for key in properties_to_delete)

    query = f"MATCH (a)-[r:{relationship}]->(b) WHERE a.name = '{de}' AND b.name = '{a}' REMOVE {formatted_properties_to_delete}"

    return query


@app.route('/delete_relationship_properties', methods=['POST'])
def delete_relationship_properties(de, a, relationship, properties_to_delete):
    driver = get_neo4j_session()
    # Execute the Cypher query
    with driver.session() as session:
        query = delete_relationship_properties_query(
            de, a, relationship, properties_to_delete)
        result = session.run(query)
    driver.close()

    return {'status': "success"}


def delete_relationship_query(de, a, relationship):
    query = f"MATCH (a)-[r:{relationship}]->(b) WHERE a.name = '{de}' AND b.name = '{a}' DELETE r"

    return query


@app.route('/delete_relationship', methods=['POST'])
def delete_relationship(de, a, relationship):
    driver = get_neo4j_session()
    # Execute the Cypher query
    with driver.session() as session:
        query = delete_relationship_query(de, a, relationship)
        result = session.run(query)
    driver.close()

    return {'status': "success"}


def delete_node_query(labels, properties):
    labels_str = ":".join(labels)
    formatted_properties = {
        key: f"'{value}'" if isinstance(value, str) else str(value)
        for key, value in properties.items()
    }
    property_str = ", ".join(
        f"{key}: {value}" for key, value in formatted_properties.items())
    query = f"MATCH (n:{labels_str} {{{property_str}}}) DETACH DELETE n"

    return query


@app.route('/delete_node', methods=['POST'])
def delete_node(labels, properties):
    driver = get_neo4j_session()
    # Execute the Cypher query
    with driver.session() as session:
        query = delete_node_query(labels, properties)
        result = session.run(query)
    driver.close()

    return {'status': "success"}


if __name__ == '__main__':
    app.run(debug=True)
