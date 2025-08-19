#!/bin/bash
source ../../config.conf
echo "HOSTNAME=${HOSTNAME}"
echo "FLASK_PORT=${FLASK_PORT}"
BOOK_ID="1"  # Replace with the actual book ID you want to update
echo "PUT: Updating a Book with ID ${BOOK_ID}"
# Update a book
curl -X PUT -H "Content-Type: application/json" -d @update_book.json http://${HOSTNAME}:${FLASK_PORT}/books/${BOOK_ID}
