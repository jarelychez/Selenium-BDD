#!/bin/bash
source ../../config.conf
echo "HOSTNAME=${HOSTNAME}"
echo "FLASK_PORT=${FLASK_PORT}"
BOOK_ID="1"  # Replace with the actual book ID you want to delete
echo "Deleting a Book with ID ${BOOK_ID}"
# Delete a book
curl -X DELETE http://${HOSTNAME}:${FLASK_PORT}/books/${BOOK_ID}