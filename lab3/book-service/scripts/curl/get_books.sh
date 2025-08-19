#!/bin/bash
source ../../config.conf
echo "HOSTNAME=${HOSTNAME}"
echo "FLASK_PORT=${FLASK_PORT}"
echo "Getting all books"
# Get Books
curl http://${HOSTNAME}:${FLASK_PORT}/books