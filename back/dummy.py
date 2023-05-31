
print("-----------------------------------")

print("CREATE QUERIES")

def create_node_query(labels, properties):
    labels_str = ":".join(labels)
    formatted_properties = {
        key: f"'{value}'" if isinstance(value, str) else str(value)
        for key, value in properties.items()
    }
    property_str = ", ".join(f"{key}: {value}" for key, value in formatted_properties.items())
    query = f"CREATE (n:{labels_str} {{{property_str}}})"

    return query



data = [
    {
        "labels": ["Person"],
        "properties": {
            "name": "John",
            "age": 30
        }
    },
    {
        "labels": ["Person", "Employee"],
        "properties": {
            "name": "Jane",
            "age": 25,
            "salary": 50000, 
            "array": [1, 2, 3],
            "boolean": True,
            "array_with_strings": ["a", "b", "c"],
            "array_with_booleans": [True, False, True]
        }
    }
]

queries = [create_node_query(**node) for node in data]

for query in queries:
    print(query)

def create_relationship_query(de, a, properties, relationship):
    formatted_properties = {
        key: f"'{value}'" if isinstance(value, str) else str(value)
        for key, value in properties.items()
    }
    property_str = ", ".join(f"{key}: {value}" for key, value in formatted_properties.items())
    query = f"MATCH (a), (b) WHERE a.name = '{de}' AND b.name = '{a}' CREATE (a)-[r:{relationship} {{{property_str}}}]->(b)"

    return query

data ={
        "de": "John",
        "a": "Jane",
        "properties": {
            "since": 2010, 
            "array": [1, 2, 3],
            "boolean": True,
        },
        "relationship": "KNOWS"
    }

query = create_relationship_query(**data)
print(query)

print("-----------------------------------")
print("UPDATE QUERIES")

def update_node_query(labels, properties):
    labels_str = ":".join(labels)
    formatted_properties = {
        key: f"'{value}'" if isinstance(value, str) else str(value)
        for key, value in properties.items()
    }
    property_str = ", ".join(f"n.{key} = {value}" for key, value in formatted_properties.items())
    query = f"MATCH (n:{labels_str}) SET {property_str}"

    return query

data = {
    "labels": ["Person"],
    "properties": {
        "name": "John",
        "age": 35
    }
}

query = update_node_query(**data)
print(query)


def update_relationship_query(de, a, properties, relationship):
    formatted_properties = {
        key: f"'{value}'" if isinstance(value, str) else str(value)
        for key, value in properties.items()
    }
    property_str = ", ".join(f"r.{key} = {value}" for key, value in formatted_properties.items())
    query = f"MATCH (a)-[r:{relationship}]->(b) WHERE a.name = '{de}' AND b.name = '{a}' SET {property_str}"

    return query

data ={

        "de": "John",
        "a": "Jane",
        "properties": {
            "since": 2014,
            "array": [1, 2, 3],
            "boolean": True,
        },
        "relationship": "KNOWS"
    }

query = update_relationship_query(**data)
print(query)


print("-----------------------------------")
print("DELETE QUERIES")

def delete_node_query(labels, properties):
    labels_str = ":".join(labels)
    formatted_properties = {
        key: f"'{value}'" if isinstance(value, str) else str(value)
        for key, value in properties.items()
    }
    property_str = ", ".join(f"{key}: {value}" for key, value in formatted_properties.items())
    query = f"MATCH (n:{labels_str} {{{property_str}}}) DETACH DELETE n"

    return query

data = {
    "labels": ["Person"],
    "properties": {
        "name": "John"
    }
}

query = delete_node_query(**data)

print(query)


def delete_relationship_query(de, a, relationship):
    query = f"MATCH (a)-[r:{relationship}]->(b) WHERE a.name = '{de}' AND b.name = '{a}' DELETE r"

    return query

data = {
    "de": "John",
    "a": "Jane",
    "relationship": "KNOWS"
}

query = delete_relationship_query(**data)

print(query)

print("-----------------------------------")

print("DELETE PROPERTIES QUERIES")

def delete_node_properties_query(labels, properties, properties_to_delete):
    labels_str = ":".join(labels)
    formatted_properties = {
        key: f"'{value}'" if isinstance(value, str) else str(value)
        for key, value in properties.items()
    }
    property_str = ", ".join(f"{key}: {value}" for key, value in formatted_properties.items())
    properties_to_delete_str = ", ".join(f"{key}" for key in properties_to_delete)
    query = f"MATCH (n:{labels_str} {{{property_str}}}) REMOVE {properties_to_delete_str}"

    return query

data = {
    "labels": ["Person"],
    "properties": {
        "name": "John",
        "age": 35,
        "salary": 50000
    },
    "properties_to_delete": ["salary"]
}

query = delete_node_properties_query(**data)

print(query)


def delete_relationship_properties_query(de, a, relationship, properties_to_delete):
    properties_to_delete_str = ", ".join(f"r.{key}" for key in properties_to_delete)
    query = f"MATCH (a)-[r:{relationship}]->(b) WHERE a.name = '{de}' AND b.name = '{a}' REMOVE {properties_to_delete_str}"

    return query

data = {
    "de": "John",
    "a": "Jane",
    "relationship": "KNOWS",
    "properties_to_delete": ["since"]
}

query = delete_relationship_properties_query(**data)

print(query)









from neo4j import GraphDatabase

"""
# Wait 60 seconds before connecting using these details, or login to https://console.neo4j.io to validate the Aura Instance is available
NEO4J_URI=neo4j+s://e7b09531.databases.neo4j.io
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=R89j_ihUVF5Y9DzIi-aQ1cbEasgLiOvhudaHztXHtfM
AURA_INSTANCEID=e7b09531
AURA_INSTANCENAME=Instance01
"""


uri = "neo4j+s://e7b09531.databases.neo4j.io"
username = "neo4j"
password = "R89j_ihUVF5Y9DzIi-aQ1cbEasgLiOvhudaHztXHtfM"

def get_relationships_as_dictionary():
    # Connect to Neo4j
    driver = GraphDatabase.driver(uri, auth=(username, password))

    # Execute the Cypher query
    with driver.session() as session:
        result = session.run("MATCH (a)-[r]->(b) RETURN a.Name AS from, type(r) AS relation, b.Name AS to")

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

relationships = get_relationships_as_dictionary()
"""for relationship in relationships:
    print(relationship)
"""