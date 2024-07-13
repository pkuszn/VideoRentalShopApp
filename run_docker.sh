#!/usr/bin/bash

mongo="mongo"
vrsa="video-rental-store-app"

echo $mongo
echo $vrsa

echo "> Creating an image..."
if sudo docker image inspect $vrsa >/dev/null 2>&1; then
    echo "Image exists locally"
else
    echo "Image does not exist locally"
    sudo docker build -t $vrsa -f Dockerfile .
fi

echo "> Creating a $vrsa container..."
if [ ! "$(sudo docker ps -a -q -f name=$vrsa)" ]; then
    if [ "$(sudo docker ps -aq -f status=exited -f name=$vrsa)" ]; then
        sudo docker rm -f $vrsa
    fi
    sudo docker run -d \
        --name video-rental-store-app \
        --network app-network \
        -p 6000:6000 \
        -e ASPNETCORE_ENVIRONMENT=Development \
        -e ASPNETCORE_URLS="http://+:6000" \
        $vrsa:latest
fi

echo "> Pulling a mongodb image..."
sudo docker pull mongo:latest

echo "> Creating a mongodb container with initialization..."
if [ ! "$(sudo docker ps -a -q -f name=mongodb)" ]; then
    if [ "$(sudo docker ps -aq -f status=exited -f name=mongodb)" ]; then
        sudo docker rm -f $mongo
    fi
    sudo docker build -t mongo-init -f Dockerfile.mongo-init .
    sudo docker run -d -p 27017:27017 --name $mongo mongo-init --network app-network
fi

echo "> Starting a $vrsa container..."
if [ "$(sudo docker ps -aq -f status=exited -f name=$vrsa)" ]; then
    sudo docker start $vrsa
fi

echo "> Starting a $mongo container..."
if [ "$(sudo docker ps -aq -f status=exited -f name=$mongo)" ]; then
    sudo docker start $mongo
fi