#!/bin/bash

USERNAME=admin
PASSWORD=admin
DBNAME=mlw16-geo-wkshp
PORT=8888

MLCP="./mlcp-8.0-5/bin/mlcp.sh"
CURL="curl --anyauth --user $USERNAME:$PASSWORD"
HOSTID="$($CURL -X POST -s -H "Content-type: application/x-www-form-urlencoded" -H "Accept: multipart/mixed; boundary=BOUNDARY" -d "xquery=xdmp:host()" http://localhost:8000/v1/eval | awk "NR==6" -)"
HOSTID=${HOSTID%?}
DIR="$(pwd)/geo-app"
FNAME="$DBNAME-1"
ASNAME="$DBNAME-appserver"

## setup appserver instance, database, and modules-database

echo "Setup database, forest, and appserver..."
$CURL -X POST -d "{\"database-name\":\"$DBNAME\"}" -H "Content-type: application/json" http://localhost:8002/manage/LATEST/databases
$CURL -X POST -d "{\"forest-name\":\"$FNAME\",\"host\":\"$HOSTID\",\"database\":\"$DBNAME\"}" -H "Content-type: application/json" http://localhost:8002/manage/LATEST/forests
$CURL -X POST -d "{\"server-name\":\"$ASNAME\",\"server-type\":\"http\",\"root\":\"$DIR\",\"port\":\"$PORT\",\"content-database\":\"$DBNAME\",\"authentication\":\"application-level\",\"url-rewriter\":\"url.xqy\"}" -H "Content-type: application/json" http://localhost:8002/manage/LATEST/servers?group-id=Default

## load data
## to learn more about MarkLogic Content Pump, see https://docs.marklogic.com/guide/mlcp

echo "Loading Data..."
sh $MLCP IMPORT -mode local -host localhost -port 8000 -database $DBNAME -username $USERNAME -password $PASSWORD -input_file_path data -input_compressed true -input_file_type archive
