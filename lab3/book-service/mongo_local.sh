#!/bin/bash
## This will build the flask api image, and run the standard insecure mongo:latest
docker-compose -f ./docker-compose-mongo.yaml up -d --remove-orphans
docker ps -a | grep book-service
