#!/bin/bash

mongo = "mongo"
vrsa = "video-rental-store-app"

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
        # cleanup
        sudo docker rm -f $vrsa
    fi
    # run your container
    sudo docker run -d -p 5001:80 --name $vrsa $vrsa
fi

echo "> Pulling a mongodb image..."
sudo docker pull $mongo

echo "> Creating a mongodb container..."
if [ ! "$(sudo docker ps -a -q -f name=$mongo)" ]; then
    if [ "$(sudo docker ps -aq -f status=exited -f name=$mongo)" ]; then
        # cleanup
        sudo docker rm -f $mongo
    fi
    # run your container
    sudo docker run -d -p 27017:27017 --name mongodb $mongo
fi