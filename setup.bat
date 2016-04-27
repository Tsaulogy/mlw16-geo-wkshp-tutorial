set MLCP=.\mlcp-8.0-5\bin\mlcp.bat
set USERNAME=admin
set PASSWORD=admin
set CURL=curl-7.3.0-win64-ssl-sspi\curl.exe -X POST --anyauth --user %USERNAME%:%PASSWORD%

rem setup appserver instance, database, and modules-database
rem to learn more about the MarkLogic REST API, see https://docs.marklogic.com/guide/rest-dev/service#id_12021

echo "Setup database, modules, and appserver..."
%CURL% -d @"./config.json" -H "Content-type: application/json" http://localhost:8002/LATEST/rest-apis

rem load data into database
rem to learn more about MarkLogic Content Pump, see https://docs.marklogic.com/guide/mlcp

echo "loading data..."
%MLCP% IMPORT -mode local -host localhost -database mlw16-geo-wkshp -port 8000 -username %USERNAME% -password %PASSWORD% -input_file_path data -input_compressed true -input_file_type archive

echo "Finished loading data"
pause
