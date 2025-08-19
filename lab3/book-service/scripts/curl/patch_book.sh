#!/bin/bash
source ../../config.conf
echo "HOSTNAME=${HOSTNAME}"
echo "FLASK_PORT=${FLASK_PORT}"
BOOK_ID="1"  # Replace with the actual book ID you want to patch
echo "Patching a Book with ID ${BOOK_ID}"
# Patch a book
curl -X PATCH -H "Content-Type: application/json" -d @patch_book.json http://${HOSTNAME}:${FLASK_PORT}/books/${BOOK_ID}