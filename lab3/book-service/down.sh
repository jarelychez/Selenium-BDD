#!/bin/bash
#  -v Remove named volumes declared in the "volumes" section of the Compose file and anonymous volumes attached to containers.
docker-compose down -v
