import chromadb
from chromadb.config import Settings
import os

class VectorDB:
    def __init__(self):
        self.client = None
        self.collection = None

    def initialize(self):
        # Use local storage for persistence
        self.client = chromadb.PersistentClient(path="./memory_store")
        self.collection = self.client.get_or_create_collection(name="oma_memory")
        print("VectorDB: Initialized ChromaDB at ./memory_store")

    def add_memory(self, content: str, metadata: dict, id: str):
        if not self.collection:
            raise Exception("VectorDB not initialized")
        
        self.collection.add(
            documents=[content],
            metadatas=[metadata],
            ids=[id]
        )

    def query_memory(self, query_text: str, n_results: int = 5):
        if not self.collection:
            raise Exception("VectorDB not initialized")
            
        return self.collection.query(
            query_texts=[query_text],
            n_results=n_results
        )

# Singleton
vector_db = VectorDB()

def init_vector_db():
    vector_db.initialize()
