from flask import Flask, g, jsonify, render_template, request, redirect, url_for, flash
from flask_cors import CORS
from neo4j import GraphDatabase
from neo4j.exceptions import Neo4jError
import csv

app = Flask(__name__)
CORS(app)

NEO4J_URI = 'neo4j+s://e7b09531.databases.neo4j.io'
NEO4J_USERNAME = 'neo4j'
NEO4J_PASSWORD = 'R89j_ihUVF5Y9DzIi-aQ1cbEasgLiOvhudaHztXHtfM'

driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USERNAME, NEO4J_PASSWORD))

def create_nodes_and_relationships(file_path):
    with driver.session() as session:
        with open(file_path, 'r') as csv_file:
            reader = csv.reader(csv_file)
            headers = next(reader)

            for row in reader:
                # Assuming your CSV has columns 'source', 'target', and 'relationship'
                source = row[headers.index('Customer')]
                target = row[headers.index('Book')]
                ret=row[headers.index('Retailer')]
                warehouse=row[headers.index('Warehouse')]
                sup=row[headers.index('Supplier')]

                relationship = 'Purchase'
                relationship2 = 'Has'

                relationship3='requests'
                relationship4='licensed'
                relationship5='supplies'
                relationship6='stores'

                relationship7='belongs'
                relationship8='ships'
                relationship9='orders'

                relationship10='owned'

                # Customer purchase book
                session.run("MERGE (s:Node {name: $source})", source=source)
                session.run("MERGE (t:Node {name: $target})", target=target)
                # Create the relationship between source and target nodes
                session.run("""
                    MATCH (s:Node {name: $source})
                    MATCH (t:Node {name: $target})
                    MERGE (s)-[:%s]->(t)
                """ % relationship, source=source, target=target)



                # Retailer has book
                session.run("MERGE (s:Node {name: $source})", source=ret)
                session.run("MERGE (t:Node {name: $target})", target=target)# Create the relationship between source and target nodes
                session.run("""
                    MATCH (s:Node {name: $source})
                    MATCH (t:Node {name: $target})
                    MERGE (s)-[:%s]->(t)
                """ % relationship2, source=source, target=target)



                # Customer requests retailer
                session.run("MERGE (s:Node {name: $source})", source=source)
                session.run("MERGE (t:Node {name: $target})", target=ret)
                # Create the relationship between source and target nodes
                session.run("""
                    MATCH (s:Node {name: $source})
                    MATCH (t:Node {name: $target})
                    MERGE (s)-[:%s]->(t)
                """ % relationship3, source=source, target=target)



                # book licensed by supplier
                session.run("MERGE (s:Node {name: $source})", source=target)
                session.run("MERGE (t:Node {name: $target})", target=sup)
                # Create the relationship between source and target nodes
                session.run("""
                    MATCH (s:Node {name: $source})
                    MATCH (t:Node {name: $target})
                    MERGE (s)-[:%s]->(t)
                """ % relationship4, source=source, target=target)



                # Supplier owns retailer
                session.run("MERGE (s:Node {name: $source})", source=sup)
                session.run("MERGE (t:Node {name: $target})", target=ret)
                # Create the relationship between source and target nodes
                session.run("""
                    MATCH (s:Node {name: $source})
                    MATCH (t:Node {name: $target})
                    MERGE (s)-[:%s]->(t)
                """ % relationship10, source=source, target=target)



                # Supplier supplies warehouse
                session.run("MERGE (s:Node {name: $source})", source=sup)
                session.run("MERGE (t:Node {name: $target})", target=warehouse)
                # Create the relationship between source and target nodes
                session.run("""
                    MATCH (s:Node {name: $source})
                    MATCH (t:Node {name: $target})
                    MERGE (s)-[:%s]->(t)
                """ % relationship5, source=source, target=target)



                # warehouse stores books
                session.run("MERGE (s:Node {name: $source})", source=warehouse)
                session.run("MERGE (t:Node {name: $target})", target=target)
                # Create the relationship between source and target nodes
                session.run("""
                    MATCH (s:Node {name: $source})
                    MATCH (t:Node {name: $target})
                    MERGE (s)-[:%s]->(t)
                """ % relationship6, source=source, target=target)



                # warehouse owned and ships retailer
                session.run("MERGE (s:Node {name: $source})", source=warehouse)
                session.run("MERGE (t:Node {name: $target})", target=ret)
                # Create the relationship between source and target nodes
                session.run("""
                    MATCH (s:Node {name: $source})
                    MATCH (t:Node {name: $target})
                    MERGE (s)-[:%s]->(t)
                """ % relationship7, source=source, target=target)

                # Create the relationship between source and target nodes
                session.run("""
                    MATCH (s:Node {name: $source})
                    MATCH (t:Node {name: $target})
                    MERGE (s)-[:%s]->(t)
                """ % relationship8, source=source, target=target)



                # retailer orders warehouse
                session.run("MERGE (s:Node {name: $source})", source=ret)
                session.run("MERGE (t:Node {name: $target})", target=warehouse)
                # Create the relationship between source and target nodes
                session.run("""
                    MATCH (s:Node {name: $source})
                    MATCH (t:Node {name: $target})
                    MERGE (s)-[:%s]->(t)
                """ % relationship9, source=source, target=target)

               


                



create_nodes_and_relationships('back\data.csv')

driver.close()