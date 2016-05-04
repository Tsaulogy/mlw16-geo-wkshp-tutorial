# MarkLogic World 2016 Geospatial Workshop
This project contains data, query workspaces, and code to use for the MarkLogic World 2016 Geospatial Workshop.

##Requirements
*MarkLogic 8.0-4 or newer installed, running
*Java
*cURL (provided for Windows)

##Quickstart

Download or clone this repo to your desktop. Navigate to the repository.
Make sure MarkLogic is up and running.

###1. Setup database, modules, appserver and load data
On a Mac or Linux machine, run:  
    sh setup.sh

On Windows, run:  
    setup.bat

###2. Check to make sure the setup has run correctly
Open your browser and go to http://localhost:8001/  
Check to see if new databases, forests, and an appserver has been setup

Open your browser and go to http://localhost:8888/  
You should be able to see a map at this location, based on your appsever setup

###2. Import the exercises to your Query Console (QConsole)
Open your browser and go to http://localhost:8000/qconsole  
On the right side of your browser, you should see a panel that lists your QConsole workspaces. Import the workspaces from the **workspace** directory in this repo.

###3.Now you're ready to go!
