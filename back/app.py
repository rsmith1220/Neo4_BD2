from flask import Flask, g, jsonify, render_template, request, redirect, url_for, flash
from flask_cors import CORS
from pymongo import MongoClient, InsertOne
from bson.objectid import ObjectId
import json
from neo4j import GraphDatabase
from neo4j.exceptions import Neo4jError
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


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
    result = session.run(
        'MATCH (n)-[r]->() RETURN n, collect(DISTINCT type(r)) AS relations')
    nodes = []
    for record in result:
        node = {
            'node': dict(record['n']),
            'relations': record['relations']
        }
        nodes.append(node)
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
    query = create_node_query(data['labels'], data['properties'])
    result = driver.run(query)
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
    query = create_relationship_query(
        data['de'], data['a'], data['properties'], data['relationship'])
    result = driver.run(query)
    node = [dict(record['n']) for record in result]

    # Close the Neo4j driver
    driver.close()

    return jsonify(node)


@app.route('/get_relation', methods=['POST'])
def get_relationships_as_dictionary():
    # Connect to Neo4j
    driver = get_neo4j_session()

    # Execute the Cypher query
    result = driver.run(
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
    query = update_node_query(labels, properties, new_properties)
    result = driver.run(query)
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
    query = update_relationship_query(de, a, properties, relationship)
    result = driver.run(query)
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
    query = delete_node_properties_query(
        labels, properties, properties_to_delete)
    result = driver.run(query)
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
    # Execute the Cypher query\
    query = delete_relationship_properties_query(
        de, a, relationship, properties_to_delete)
    result = driver.run(query)
    driver.close()

    return {'status': "success"}


def delete_relationship_query(start_node_labels, end_node_labels, relationship_type):
    start_node_labels_str = ":".join(start_node_labels)
    end_node_labels_str = ":".join(end_node_labels)
    query = f"MATCH (start:{start_node_labels_str})-[rel:{relationship_type}]->(end:{end_node_labels_str}) DELETE rel"
    return query

@app.route('/delete_relationship', methods=['POST'])
def delete_relationship():
    data = request.get_json()  # Retrieve the JSON payload from the request
    driver = get_neo4j_session()
    start_node_labels = data.get('start_node_labels', [])  # Retrieve the labels of the starting node
    end_node_labels = data.get('end_node_labels', [])  # Retrieve the labels of the ending node
    relationship_type = data.get('relationship_type')  # Retrieve the type of the relationship

    try:
        # Rest of your code for constructing the query and executing it
        query = delete_relationship_query(start_node_labels, end_node_labels, relationship_type)
        result = driver.run(query)
        # Successful deletion
        return {'status': 'success'}
    except Exception as e:
        # Error occurred, handle the exception
        return {'status': 'error', 'message': str(e)}



def delete_node_query(labels):
    labels_str = ":".join(labels)
    query = f"MATCH (n:{labels_str}) DETACH DELETE n"
    return query

@app.route('/delete_node', methods=['POST'])
def delete_node():
    data = request.get_json()  # Retrieve the JSON payload from the request
    driver = get_neo4j_session()
    labels = data.get('labels', [])  # Retrieve the 'labels' from the payload

    try:
        # Rest of your code for constructing the query and executing it
        query = delete_node_query(labels)
        result = driver.run(query)
        # Successful deletion
        return {'status': 'success'}
    except Exception as e:
        # Error occurred, handle the exception
        return {'status': 'error', 'message': str(e)}



if __name__ == '__main__':
    app.run(debug=True)
