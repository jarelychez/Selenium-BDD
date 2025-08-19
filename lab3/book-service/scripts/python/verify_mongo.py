from pymongo import MongoClient

# Configuration for MongoDB
mongo_uri = "mongodb://localhost:27017/"
database_name = "books_db"
collection_name = "books"

# Connect to MongoDB
client = MongoClient(mongo_uri)
db = client[database_name]
collection = db[collection_name]

# Define a sample book document
sample_book = {
    "title": "Sample Book",
    "author": "Sample Author",
    "genre": "Sample Genre"
}

# Insert the sample book into the collection
insert_result = collection.insert_one(sample_book)
print(f"Inserted document ID: {insert_result.inserted_id}")

# Verify the insertion
inserted_book = collection.find_one({"_id": insert_result.inserted_id})
print(f"Inserted Book: {inserted_book}")

# Delete the inserted document
delete_result = collection.delete_one({"_id": insert_result.inserted_id})
print(f"Deleted document count: {delete_result.deleted_count}")

# Verify the deletion
deleted_book = collection.find_one({"_id": insert_result.inserted_id})
print(f"Deleted Book (should be None): {deleted_book}")

# Close the MongoDB connection
client.close()
