# Setup
1. source ./setup_env.sh
2. source ./activate.sh
3. source ./install_dependencies.sh
4. source ./start_api.sh

## Mongo
docker-compose up
docker compose up -d
docker-compose down

## Mongo and Flask

docker-compose build
docker-compose up
docker-compose down

or 

docker-compose up --build
docker-compose down

## Verify Mongo
python verify_mongo.py

```s
Inserted document ID: 6672be2d147a5b0b894527bc
Inserted Book: {'_id': ObjectId('6672be2d147a5b0b894527bc'), 'title': 'Sample Book', 'author': 'Sample Author', 'genre': 'Sample Genre'}
Deleted document count: 1
Deleted Book (should be None): None
```

## Locate processess running port 5005

__MACOS__

lsof -i :5005

__Linux__

lsof -i :5005
netstat -anp | grep 5005

