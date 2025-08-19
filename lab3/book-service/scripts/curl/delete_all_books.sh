#!/bin/bash
source ../../config.conf
echo "HOSTNAME=${HOSTNAME}"
echo "FLASK_PORT=${FLASK_PORT}"
echo "Deleting all books"
# Delete all books
curl -X DELETE http://${HOSTNAME}:${FLASK_PORT}/books
