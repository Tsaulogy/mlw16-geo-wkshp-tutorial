@echo off

set USERNAME=admin
set PASSWORD=admin
set DBNAME=mlw16-geo-wkshp
set PORT=8888

set MLCP=.\mlcp-8.0-5\bin\mlcp.bat
set CURL=curl-7.3.0-win64-ssl-sspi\curl.exe -X POST --anyauth --user %USERNAME%:%PASSWORD%

set "DIR=%cd%geo-app"
set "FNAME=%DBNAME%-1"
set "ASNAME=%DBNAME%-appserver"

%CURL% -s -H "Content-type: application/x-www-form-urlencoded" -H "Accept: multipart/mixed; boundary=BOUNDARY" -d "xquery=xdmp:host()" http://localhost:8000/v1/eval > .\host.tmp
for /f "usebackq delims=" %%a in (`more +5 .\host.tmp`) DO (
  set "HOSTID=%%a"
  goto :leave
)
:leave
del .\host.tmp

rem setup appserver instance, database, and modules-database
rem to learn more about the MarkLogic REST API, see https://docs.marklogic.com/guide/rest-dev/service#id_12021

echo "Setup database, modules, and appserver..."
%CURL% -d "{^"database-name^":^"%DBNAME%^"}" -H "Content-type: application/json" http://localhost:8002/manage/LATEST/databases
%CURL% -d "{^"forest-name^":^"%FNAME%^",^"host^":^"%HOSTID%^",^"database^":^"%DBNAME%^"}" -H "Content-type: application/json" http://localhost:8002/manage/LATEST/forests
%CURL% -d "{^"server-name^":^"%ASNAME%^",^"server-type^":^"http^",^"root^":^"%DIR%^",^"port^":^"%PORT%^",^"content-database^":^"$DBNAME^",^"authentication^":^"application-level^",^"url-rewriter^":^"url.xqy^"}" -H "Content-type: application/json" http://localhost:8002/manage/LATEST/servers?group-id=Default

rem load data into database
rem to learn more about MarkLogic Content Pump, see https://docs.marklogic.com/guide/mlcp

echo "loading data..."
%MLCP% IMPORT -mode local -host localhost -database mlw16-geo-wkshp -port 8000 -username %USERNAME% -password %PASSWORD% -input_file_path data -input_compressed true -input_file_type archive

echo "Finished loading data"
pause
