#!/bin/bash
#$1=docker name
#$2=tag
#$3=foldername
#$4=executable location (/var/home/user/executablename )
#keep basic docker file in specific location in this case i asue docker file store in /home/dockerfile/Dockerfile .github also ok for this
#$5:$6 =ports(3000:3000)
#$7= prosess name
#$8= ram
#$9= cpu
#$10= securityToken
#$11= tenantID

echo "Running Smooth.sh started."
echo ""
echo "Docker Name : ":$1
echo "Tag : ":$2
echo "FolderName : ":$3
echo "Exec Location : ":$4
echo "Ports ":$5:$6
echo "Process Name ":$7
echo "RAM ":$8
echo "CPU ":$9
echo "SecurityToken ":${10}
echo "Tenant ":${11}

newport=0
path=$(pwd)
sudo docker rm -f $1
sudo docker rmi -f $1

cd  /home/sflow/PublishedDockers/$3/${11}

chmod 777 *

sudo cp /home/sflow/DockerRelatedFiles/Dockerfile /home/sflow/PublishedDockers/$3/${11}
sudo docker build -t $1:$2 .
echo "docker run -d --memory=$8 --cpus=$9 -p $5:$6 $1:$2 $7"
sudo docker run -d --name=$1 --memory=$8 --cpus=$9 -p $5:$6 $1:$2 $7

newport=$(($5 + 1))

cd /home/sflow
echo "./runner plus.smoothflow.io $1 $newport $1_proxy ${10} ${11}"
sudo ./runner plus.smoothflow.io $1 $newport $1_proxy ${10} ${11}

echo "Publishing to Docker is complete!"
