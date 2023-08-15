#!/usr/bin/bash

mongo="mongo"
vrsa="video-rental-store-app"

echo $mongo
echo $vrsa

echo "> Creating an image..."
if sudo docker image inspect $vrsa >/dev/null 2>&1; then
	echo "Image exists locally"
else
	echo "Image does not exists locally"
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
sudo docker pull $mongo:latest

echo "> Creating a mongodb container..."
if [ ! "$(sudo docker ps -a -q -f name=$mongo)" ]; then
    if [ "$(sudo docker ps -aq -f status=exited -f name=$mongo)" ]; then
        sudo docker rm -f $mongo
    fi
    sudo docker run -d -p 27017:27017 --name mongodb $mongo
fi

echo "> Starting a $vrsa container..."
if [ "$(sudo docker ps -aq -f status=exited -f name=$vrsa)" ]; then
    sudo docker start $vrsa
fi

echo "> Starting a $mongo container..."
if [ "$(sudo docker ps -aq -f status=exited -f name=$mongo)" ]; then
    sudo docker start $mongo
fi
