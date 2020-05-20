#!/bin/bash

touch tmp
echo "------ RUNNING $0 $1 $2 $3------" > tmp

## PATH ##
path="./services/correction"
pathContainer=$path/debian_container
pathFile=$path/tmp
pathCorrectionFile=$path/src

## ------  CONDITION D'EXECUTION ------ ##
if [ $# -eq 0 ]; then
{
    echo "Usage: sh correct.sh <file> <correction_file>" 
    exit 1
}
fi

## ------  CREATION DE L'IMAGE DOCKER ------ ##
cp $pathFile/"$1" $pathContainer
cp $pathCorrectionFile/"$2" $pathContainer
docker image build $pathContainer -t $1 > tmp

## ------  SUPPRESSION DU FICHIER A TESTER DANS LE BACK-END ------ ##
rm $pathContainer/"$1"
rm $pathContainer/"$2"


## ------  LANCEMENT DU CONTAINER DEBIAN AVEC LE FICHIER A TESTER------ ##
docker run --name "$1" -d "$1" > tmp
id=$(docker ps --format="{{.ID}}" --filter "name=$1") 

## ------  OUTPUT DE L'EXECUTION DU FICHIER ------ ##
echo $(docker exec "$id" sh $2 $1)

## ------ SUPPRESION DU CONTAINER ------ ##
docker stop "$id" > tmp
docker rm "$id" > tmp 
docker image rm "$1" > tmp
rm tmp

exit 0