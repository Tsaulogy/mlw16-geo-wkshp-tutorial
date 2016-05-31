# MarkLogic World 2016 Geospatial Workshop
This project contains data, query workspaces, and code to use for the MarkLogic World 2016 Geospatial Workshop.

##Requirements
* MarkLogic 8.0-4 or newer installed, running
* Java
* cURL (provided for Windows)
* MarkLogic Content Pump (AKA [MLCP](http://docs.marklogic.com/guide/mlcp)) (included in this repository)

##Quickstart

_**If you do not have MarkLogic installed or do not have a proper version installed**, please complete Step 0 before proceeding to Step 1._

###0. Setup MarkLogic & Java
####Setup MarkLogic
1. Uninstall your current MarkLogic Server (if applicable)
2. Download the latest version of MarkLogic from the [MarkLogic Developer Community](http://developer.marklogic.com/products)
3. Install and Start MarkLogic (see MarkLogic Documentation for more details - [Installing MarkLogic Server](http://docs.marklogic.com/guide/installation/procedures#id_28962) & [Starting MarkLogic Server](http://docs.marklogic.com/guide/installation/procedures#id_92457)
  * *Hint: For those of you new to MarkLogic, don't worry if it looks like nothing happens when you click 'Start MarkLogic Server' -- MarkLogic Server will start running in the background, and you can proceed to Step 4*
4. In your browser (e.g. Chrome, Firefox), go to [http://localhost:8001](http://localhost:8001) and configure the database. Choose the below user name and password. 
  * For the admin user name: _admin_
  * For the admin password: _admin_
  * _For step-by-step details for configuration, see MarkLogic Documentation - [Configuring a Single Host or the First Host in a Cluster](http://docs.marklogic.com/guide/installation/procedures#id_60220), steps 3 - 9_

You will see the Admin Interface when you are done configuring MarkLogic.
 
####Setup Java
1. Ensure you have Java installed (to check, run _java -version_ in your terminal and see if you get a version response)
  * If you don't have Java installed, please [download and install it](https://java.com/en/download/)


###1. Grab a local copy of this repo 
Download or clone this repo to your desktop. Navigate to the directory that includes the repository. Make sure MarkLogic is up and running (if you've completed Step 0, you're good to go.).

e.g. Unzip the repo and go to folder D:\github\mlw16-geo-wkshp-tutorial-master



###2. Setup database, modules, appserver and load data
On a Mac or Linux machine, run:  
>sh setup.sh

On Windows, run:  
>setup.bat


Under the hood, these scripts use MarkLogic's [Management API](http://docs.marklogic.com/guide/monitoring/monitoringAPI) and MLCP to do the setup.

The scripts assume you chose _admin_ : _admin_ for your MarkLogic admin login information (see Step 0.4 above). If you __did not__ choose this login during your MarkLogic configuration, you will need to open up the appropriate script file and update the USERNAME and PASSWORD.



###3. Check to make sure the setup has run correctly
Open your browser and go to [http://localhost:8001/](http://localhost:8001/). Check the Admin Interface to see if new databases, forests, and an appserver has been setup. If your setup is successful, you should see:

* _mlw16-geo-wkshp_ - listed as one of the databases
* _mlw16-geo-wkshp-1_ - listed as one of the forests
* _mlw16-geo-wkshp-appserver : 8888 [HTTP]_ - listed as one of the application servers

Open your browser and go to [http://localhost:8888/main.html](http://localhost:8888/main.html). You should be able to see a map at this location, based on your appsever setup



###4. Import the exercises to your Query Console (QConsole)
Open your browser and go to [http://localhost:8000/qconsole](http://localhost:8000/qconsole/). This is the [Query Console (AKA QConsole)](http://docs.marklogic.com/guide/qconsole/intro).  
On the right side of your browser, you should see a panel that lists your QConsole workspaces. Import the workspaces from the **workspace** directory in this repo. This tutorial includes JavaScript and XQuery versions of the same workspaces.



###5. Now you're ready to go! 
Walk through the workspaces in sequence (starting from Unit 1). When you get to Unit 4, read __EXERCISES.txt__ in this repository's __geo-app__ directory before getting started.

Have fun!
