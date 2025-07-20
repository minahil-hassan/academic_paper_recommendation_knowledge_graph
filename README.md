# 📚 Academic Paper Recommendation System

This project is an AI-powered academic paper recommendation system that leverages **graph-based reasoning** and **embedding-based similarity** to recommend research papers based on a user-uploaded paper or query. It uses **Neo4j** for knowledge graph storage and **OpenAI embeddings** for semantic similarity.

---

## 🚀 Features

### 🔍 Intelligent Paper Recommendation
- **Graph traversal with BFS + PageRank-style scoring**.
- Weighs relationships like `CITES`, `HAS_KEYWORD`, `WRITTEN_BY`, etc.
- Pre-filters relevant papers using keyword combinations extracted from the title.
- Traverses knowledge graph at each depth to retrieve neighbours and papers connected to neighbours.
- Scores are propagated back to parent nodes.

### 🧠 Embedding-Based Ranking
- Uses OpenAI's `text-embedding-ada-002` model to compute similarity between abstract vectors.
- Ranks top papers based on **cosine similarity** to the query paper's abstract.

### 🖼 Graph Visualization
- Finds and renders the **shortest path** from the query paper to the top recommended paper.
- Helps users visualize and interpret why a recommendation was made.

### 🔎 Explore Papers
- Powerful filtering interface to search the knowledge graph using:
  - Keywords
  - Authors
  - Venue (Journal)
  - Year of publication

### 📄 PDF Upload & Metadata Extraction
- Upload a paper (PDF) and auto-extract metadata using OpenAI.
- Supports downstream recommendation directly from the uploaded file.

---

## 🧩 Project Structure

```
📁 backend/
├── manage.py                    # Django project entrypoint
├── db.sqlite3                   # Local SQLite database
├── 📁 backend/                  # Django settings and configuration
│   └── __init__.py, settings.py, urls.py, etc.
├── 📁 metadata/                 # Main app for API views and paper metadata extraction
│   ├── views.py                # Core API logic (upload, extract, explore, recommend)
│   ├── urls.py                 # URL routing for API endpoints
│   ├── models.py               # (Optional) Models, if used
│   └── admin.py, apps.py, etc.
├── 📁 recommendation/          # Core recommendation logic and algorithms
│   ├── bfs_with_embeddings.py # Graph traversal with scoring and filtering
│   └── embeddings_module.py   # Embedding generation, cosine similarity
```

```
📁 frontend/
├── public/                     # Static files
├── src/
│   ├── App.js                  # Main landing and routing file with recommendation frontend
│   ├── ExplorePapers.js        # Search/filter paper components
│   ├── Graph.js                # Graph visualization of query → recommendation path
│   └── ...                     # Other React components, utils, etc.
```

---

## 🛠 Technologies Used

- **Backend**: Django, Neo4j (with `neo4j` Python driver)
- **Frontend**: React.js
- **Graph DB**: Neo4j (Knowledge Graph) with Cypher
- **NLP**: NLTK, OpenAI Embeddings
- **Visualization**: Custom React-based D3.js graph rendering

---

## 🧪 How It Works

1. **User Inputs a Paper PDF file or uses Explore function to select paper fron knowledge base**
2. **System Extracts Keywords (via NLTK)**
3. **Neo4j Queried for Matching Papers**
4. **BFS Traversal & Score Expansion** (using graph structure)
5. **Top 10 Papers Ranked**
6. **Embeddings Calculated for Query + Candidates**
7. **Top 3+7 Most Semantically Similar Papers Returned semantically ranked**
8. **Shortest Path (Query ↔ Recommendation) Visualized**

---

## 🧑‍💻 Getting Started

1. **Install Dependencies**

   Backend:
   ```bash
   pip install django neo4j nltk openai
   ```

   Frontend:
   ```bash
   npm install
   ```

2. **Set up Neo4j DB**
   - Ensure your papers and metadata are stored with embeddings and relationships (prepared data in data folder).
   - Create the following vector index for similarity:
     ```cypher
     CREATE VECTOR INDEX paper_embedding_index FOR (p:Paper) ON (p.embedding)
     OPTIONS { indexConfig: { `vector.dimensions`: 1536, `vector.similarity_function`: "cosine" } };
     ```

3. **Run Backend**
   ```bash
   python manage.py runserver
   ```

4. **Run Frontend**
   ```bash
   npm start
   ```

---
