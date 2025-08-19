f this is post, create seprste = put, patch, and delet eon one
#!/bin/bash
source ../../config.conf
echo "HOSTNAME=${HOSTNAME}"
echo "FLASK_PORT=${FLASK_PORT}"
echo "POST: Inserting a new Book"
# Update a book
curl -X POST -H "Content-Type: application/json" -d @sample_bookid1.json http://${HOSTNAME}:${FLASK_PORT}/books