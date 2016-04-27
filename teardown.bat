set USERNAME=admin
set PASSWORD=admin
set CURL=curl-7.3.0-win64-ssl-sspi\curl.exe -X DELETE --anyauth --user %USERNAME%:%PASSWORD%

rem teardown appserver instance, database, and modules-database
rem to learn more about the MarkLogic REST API, see https://docs.marklogic.com/guide/rest-dev/service#id_12021

echo "Teardown database, modules, and appserver..."
%CURL% "http://localhost:8002/LATEST/rest-apis/mlw16-geo-wkshp-appserver?include=content&include=modules"

pause
