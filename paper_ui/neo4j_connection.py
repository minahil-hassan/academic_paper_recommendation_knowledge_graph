import csv
from neo4j import GraphDatabase

# # Updated Ngrok URL for the Bolt protocol
# uri = "bolt:///6.tcp.eu.ngrok.io:19138"
# password = "Honeypot00446"  # Replace with your Neo4j password

# # Create a Neo4j driver
# driver = GraphDatabase.driver(uri, auth=("neo4j", password))

# Replace with your database credentials
URI = "bolt://localhost:7687"  # Change this if using a remote database
USERNAME = "neo4j"
PASSWORD = "Honeypot00446"

# Create a Neo4j driver instance
driver = GraphDatabase.driver(URI, auth=(USERNAME, PASSWORD))

# Function to check the connection by running a simple query
def test_connection():
    try:
        with driver.session() as session:
            # Run a simple Cypher query to check the connection
            result = session.run("RETURN 'Connection Successful' AS message")
            message = result.single()["message"]
            print(message)  # Should print "Connection Successful"
    except Exception as e:
        print(f"Error occurred: {e}")

# Test the connection
test_connection()


import pandas as pd



# Function to read metadata from CSV using Pandas
def read_metadata_from_csv(file_path):
    metadata = {}
    try:
        # Read the CSV file using Pandas
        df = pd.read_csv(file_path)
        
        # Display the first row of the dataframe for debugging
        print("Data from CSV:", df.head())

        # Extracting the relevant fields from the first row
        metadata['title'] = df.loc[0, 'title']
        metadata['abstract'] = df.loc[0, 'abstract']
        metadata['authors'] = df.loc[0, 'authors']
        metadata['year'] = df.loc[0, 'year']
        metadata['journal'] = df.loc[0, 'journal']
        
    except Exception as e:
        print(f"Error reading metadata from CSV: {e}")
    return metadata






# Function to perform graph traversal and find papers based on multiple metadata
def find_papers_by_metadata(title=None, keywords=None, authors=None, year=None, abstract=None):
    try:
        with driver.session() as session:
            # Print the starting point of the query
            print(f"Starting the process to find papers related to the metadata provided...")

            # Initialize a dictionary to store the common connections for each paper
            paper_connections = {}

            # Query for Title Matches
            if title:
                title_query = """
                MATCH (p:Paper {title: $title})-[:HAS_KEYWORD]->(k:Keyword)<-[:HAS_KEYWORD]-(related:Paper)
                WHERE p <> related
                RETURN related.title AS related_paper, COUNT(DISTINCT k) AS common_keywords
                """
                title_result = session.run(title_query, title=title)
                for record in title_result:
                    related_paper = record["related_paper"]
                    common_keywords = record["common_keywords"]
                    if related_paper not in paper_connections:
                        paper_connections[related_paper] = 0
                    paper_connections[related_paper] += common_keywords

            # Query for Keywords in Abstract
            if abstract:
                abstract_query = """
                MATCH (p:Paper {title: $title})-[:HAS_KEYWORD]->(abstract_keyword:Keyword)<-[:HAS_KEYWORD]-(related:Paper)
                WHERE p <> related
                RETURN related.title AS related_paper, COUNT(DISTINCT abstract_keyword) AS common_abstract_keywords
                """
                abstract_result = session.run(abstract_query, title=title)
                for record in abstract_result:
                    related_paper = record["related_paper"]
                    common_abstract_keywords = record["common_abstract_keywords"]
                    if related_paper not in paper_connections:
                        paper_connections[related_paper] = 0
                    paper_connections[related_paper] += common_abstract_keywords

            # Query for Authors
            if authors:
                author_query = """
                MATCH (p:Paper {title: $title})-[:WRITTEN_BY]->(author:Author)<-[:WRITTEN_BY]-(related:Paper)
                WHERE p <> related
                RETURN related.title AS related_paper, COUNT(DISTINCT author) AS common_authors
                """
                author_result = session.run(author_query, title=title)
                for record in author_result:
                    related_paper = record["related_paper"]
                    common_authors = record["common_authors"]
                    if related_paper not in paper_connections:
                        paper_connections[related_paper] = 0
                    paper_connections[related_paper] += common_authors

            # Query for Year of Publication
            if year:
                year_query = """
                MATCH (p:Paper {title: $title})-[:PUBLISHED_IN]->(pub:Year)<-[:PUBLISHED_IN]-(related:Paper)
                WHERE p <> related
                RETURN related.title AS related_paper, COUNT(DISTINCT pub) AS common_years
                """
                year_result = session.run(year_query, title=title)
                for record in year_result:
                    related_paper = record["related_paper"]
                    common_years = record["common_years"]
                    if related_paper not in paper_connections:
                        paper_connections[related_paper] = 0
                    paper_connections[related_paper] += common_years

            # Query for Citations
            citation_query = """
            MATCH (p:Paper {title: $title})-[:CITES]->(citation:Paper)<-[:CITES]-(related:Paper)
            WHERE p <> related
            RETURN related.title AS related_paper, COUNT(DISTINCT citation) AS common_citations
            """
            citation_result = session.run(citation_query, title=title)
            for record in citation_result:
                related_paper = record["related_paper"]
                common_citations = record["common_citations"]
                if related_paper not in paper_connections:
                    paper_connections[related_paper] = 0
                paper_connections[related_paper] += common_citations

            # Now sort the papers by the total number of common connections
            sorted_related_papers = sorted(paper_connections.items(), key=lambda x: x[1], reverse=True)[:5]

            # Display the top 5 related papers based on total common connections
            if sorted_related_papers:
                print(f"Process Complete: Top 5 related papers are:")
                for idx, (related_paper, total_connections) in enumerate(sorted_related_papers, start=1):
                    print(f"{idx}. {related_paper}")
                    print(f"   Total common connections: {total_connections}")
            else:
                print(f"Process Complete: No related papers found based on the provided metadata.")

    except Exception as e:
        print(f"Error occurred: {e}")

# Read metadata from CSV
file_path = "C:\\Users\\Hp\\Desktop\\third_year\\project\\paper_ui\\backend\\metadata.csv"
metadata = read_metadata_from_csv(file_path)

# If metadata is successfully extracted, call the function
if metadata:
    print("Metadata extracted successfully!")
    print(metadata)  # Print out the metadata to verify
else:
    print("Failed to extract metadata from CSV.")

# Pass the metadata to the function
find_papers_by_metadata(
    title=metadata.get('title'),
    abstract=metadata.get('abstract'),
    authors=metadata.get('authors'),
    year=metadata.get('year')
)
