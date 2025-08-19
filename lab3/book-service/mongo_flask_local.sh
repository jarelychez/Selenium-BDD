#!/bin/bash
## This will build the flask api image, and run the standard insecure mongo:latest
docker-compose -f ./docker-compose-flask-mongo.yaml up -d
docker ps -a | grep book-service
