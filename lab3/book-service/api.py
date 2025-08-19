import os
import json
import logging
from logging.config import dictConfig
from flask import Flask, jsonify, request, make_response
from pymongo import MongoClient, errors
from bson.objectid import ObjectId

# Configure logging
dictConfig(
    {
        "version": 1,
        "formatters": {
            "default": {
                "format": "[%(asctime)s] [%(levelname)s | %(module)s] %(message)s",
                "datefmt": "%B %d, %Y %H:%M:%S %Z",
            },
        },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "formatter": "default",
                "stream": "ext://sys.stdout",  # Ensure logs go to stdout
            },
        },
        "root": {"level": "DEBUG", "handlers": ["console"]},
    }
)

app = Flask(__name__)

# MongoDB configuration
mongo_uri = os.getenv('MONGO_URI', 'mongodb://localhost:27017/books_db')
client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
db = client['books_db']
books_collection = db['books']

flask_debug = os.getenv('FLASK_DEBUG', 'True').lower() not in ['false', '0', 'f']
flask_host = os.getenv('FLASK_HOST', '0.0.0.0')
flask_port = int(os.getenv('FLASK_PORT', '5005'))

app.logger.setLevel(logging.DEBUG)
app.logger.debug(f"flask_debug={flask_debug}")
app.logger.debug(f"flask_host={flask_host}")
app.logger.debug(f"flask_port={flask_port}")

# Check if MongoDB is accessible
try:
    client.server_info()  # Forces a call to the server to check if it's available
except errors.ServerSelectionTimeoutError as err:
    app.logger.error(f"Could not connect to MongoDB: {err}")
    exit(1)

# Load initial book data from books.json file
with open('books.json') as f:
    initial_books = json.load(f)

# Insert initial data into MongoDB if collection is empty
if books_collection.count_documents({}) == 0:
    books_collection.insert_many(initial_books)

def convert_objectid_to_str(doc):
    """Convert ObjectId to string for JSON serialization."""
    if isinstance(doc, list):
        return [convert_objectid_to_str(sub_doc) for sub_doc in doc]
    if isinstance(doc, dict):
        for key, value in doc.items():
            if isinstance(value, ObjectId):
                doc[key] = str(value)
            elif isinstance(value, dict):
                doc[key] = convert_objectid_to_str(value)
            elif isinstance(value, list):
                doc[key] = [convert_objectid_to_str(v) for v in value]
    return doc

@app.route('/books', methods=['GET', 'POST', 'DELETE', 'OPTIONS'])
def get_or_add_books():
    if request.method == 'OPTIONS':
        return handle_options(['GET', 'POST', 'DELETE', 'OPTIONS'])

    if request.method == 'GET':
        books = list(books_collection.find())
        books = convert_objectid_to_str(books)
        return jsonify(books), 200

    if request.method == 'POST':
        if not request.is_json:
            return jsonify({'message': 'Request payload must be in JSON format'}), 400
        book_data = request.get_json()
        if not book_data:
            return jsonify({'message': 'Request payload cannot be empty'}), 400

        existing_book = books_collection.find_one({'bookid': book_data.get('bookid')})
        if existing_book:
            return jsonify({'message': 'Book with the same bookid already exists'}), 409
        
        new_book = {
            'bookid': book_data.get('bookid'),
            'title': book_data.get('title'),
            'author': book_data.get('author'),
            'genre': book_data.get('genre')
        }
        result = books_collection.insert_one(new_book)
        new_book_id = str(result.inserted_id)
        return jsonify(new_book_id), 201

    if request.method == 'DELETE':
        delete_result = books_collection.delete_many({})
        return jsonify({'message': f'{delete_result.deleted_count} books deleted'}), 200

@app.route('/books/<string:book_id>', methods=['GET', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'])
def get_update_or_delete_book(book_id):
    if request.method == 'OPTIONS':
        return handle_options(['GET', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'])

    if request.method == 'GET':
        try:
            # Convert book_id to an integer if possible
            book_id = int(book_id)
        except ValueError:
            return jsonify({'message': 'Invalid book ID format'}), 400

        book = books_collection.find_one({'bookid': book_id})
        if book:
            book = convert_objectid_to_str(book)
            return jsonify(book), 200
        return jsonify({'message': 'Book not found'}), 404

    if request.method == 'PUT':
        if not request.is_json:
            return jsonify({'message': 'Request payload must be in JSON format'}), 400
        book_data = request.get_json()
        if not book_data:
            return jsonify({'message': 'Request payload cannot be empty'}), 400
        if not all(field in book_data and book_data[field] is not None for field in ['title', 'author', 'genre']):
            return jsonify({'message': 'Fields title, author, and genre cannot be null'}), 400

        try:
            book_id = int(book_id)
        except ValueError:
            return jsonify({'message': 'Invalid book ID format'}), 400

        # Check if the book exists
        existing_book = books_collection.find_one({'bookid': book_id})
        if not existing_book:
            return jsonify({'message': 'Book not found'}), 404

        # Update the existing book
        update_result = books_collection.update_one(
            {'bookid': book_id},
            {'$set': {
                'title': book_data.get('title'),
                'author': book_data.get('author'),
                'genre': book_data.get('genre')
            }}
        )
        if update_result.matched_count == 0:
            return jsonify({'message': 'Book not found'}), 404
        
        updated_book = books_collection.find_one({'bookid': book_id})
        updated_book = convert_objectid_to_str(updated_book)
        return jsonify(updated_book), 200

    if request.method == 'PATCH':
        if not request.is_json:
            return jsonify({'message': 'Request payload must be in JSON format'}), 400
        book_data = request.get_json()
        if not book_data:
            return jsonify({'message': 'Request payload cannot be empty'}), 400

        try:
            book_id = int(book_id)
        except ValueError:
            return jsonify({'message': 'Invalid book ID format'}), 400

        update_data = {k: v for k, v in book_data.items() if v is not None}
        update_result = books_collection.update_one(
            {'bookid': book_id},
            {'$set': update_data}
        )
        if update_result.matched_count == 0:
            return jsonify({'message': 'Book not found'}), 404
        updated_book = books_collection.find_one({'bookid': book_id})
        updated_book = convert_objectid_to_str(updated_book)
        return jsonify(updated_book), 200

    if request.method == 'DELETE':
        try:
            # Convert book_id to an integer if possible
            book_id = int(book_id)
        except ValueError:
            return jsonify({'message': 'Invalid book ID format'}), 400

        # Check if the book exists
        book = books_collection.find_one({'bookid': book_id})
        if not book:
            return jsonify({'message': 'Book not found'}), 404

        # If the book exists, proceed to delete it
        delete_result = books_collection.delete_one({'bookid': book_id})
        if delete_result.deleted_count == 0:
            # This should not happen since we checked the existence earlier
            return jsonify({'message': 'Book not found'}), 404

        return jsonify({'bookid': book_id, 'message': 'Book successfully deleted'}), 200

def handle_options(allowed_methods):
    response = make_response()
    response.headers['Allow'] = ', '.join(allowed_methods)
    return response, 200

if __name__ == '__main__':
    app.run(debug=flask_debug, host=flask_host, port=flask_port)

