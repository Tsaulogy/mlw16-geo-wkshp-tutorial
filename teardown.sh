#!/bin/bash

USERNAME=admin
PASSWORD=admin
CURL="curl -X DELETE --anyauth --user $USERNAME:$PASSWORD"

## teardown appserver instance, database, and modules-database
## to learn more about the MarkLogic REST API, see https://docs.marklogic.com/guide/rest-dev/service#id_12021

echo "Setup database, modules, and appserver..."
$CURL "http://localhost:8002/LATEST/rest-apis/mlw16-geo-wkshp-appserver?include=content&include=modules"
