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
    sudo docker run -d -p 5001:80 --name $vrsa $vrsa
fi

echo "> Pulling a mongodb image..."
sudo docker pull mongo:latest

echo "> Creating a mongodb container with initialization..."
if [ ! "$(sudo docker ps -a -q -f name=mongodb)" ]; then
    if [ "$(sudo docker ps -aq -f status=exited -f name=mongodb)" ]; then
        sudo docker rm -f mongodb
    fi
    sudo docker build -t mongo-init -f Dockerfile.mongo-init .
    sudo docker run -d -p 27017:27017 --name mongodb mongo-init
fi

echo "> Starting a $vrsa container..."
if [ "$(sudo docker ps -aq -f status=exited -f name=$vrsa)" ]; then
    sudo docker start $vrsa
fi

echo "> Starting a $mongo container..."
if [ "$(sudo docker ps -aq -f status=exited -f name=mongodb)" ]; then
    sudo docker start mongodb
fi