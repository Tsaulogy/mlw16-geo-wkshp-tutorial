#!/bin/bash

MLCP="./mlcp-8.0-5/bin/mlcp.sh"
USERNAME=admin
PASSWORD=admin
CURL="curl -X POST --anyauth --user $USERNAME:$PASSWORD"

## setup appserver instance, database, and modules-database
## to learn more about the MarkLogic REST API, see https://docs.marklogic.com/guide/rest-dev/service#id_12021

echo "Setup database, modules, and appserver..."
$CURL -d @"./config.json" -H "Content-type: application/json" http://localhost:8002/LATEST/rest-apis

## load data
## to learn more about MarkLogic Content Pump, see https://docs.marklogic.com/guide/mlcp

echo "Loading Data..."
$MLCP IMPORT -mode local -host localhost -port 8000 -database mlw16-geo-wkshp -username $USERNAME -password $PASSWORD -input_file_path data -input_compressed true -input_file_type archive
