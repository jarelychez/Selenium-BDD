#!/bin/bash
## This non default YAML is to start mongo on it's own not flask, and mongo
docker-compose build 
docker-compose -f ./docker-compose-mongo.yaml  up -d
