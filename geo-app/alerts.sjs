var alert = require("/MarkLogic/alert.xqy");
var geojson = require('/MarkLogic/geospatial/geojson.xqy');

////////////////////////////////////////////////////////////////////////////////



//EXERCISE: Write code here to get all rules for the crime-alert alert config
var rules = ...;



////////////////////////////////////////////////////////////////////////////////

//loop through the rules and put the output into the alertList array
var alertList = [];
rules.forEach(function(rule) {

  //////////////////////////////////////////////////////////////////////////////



  //EXERCISE: Write code here to find the region associated to the rule
  var region = ...;


  //EXERCISE: Write code here to find all documents in the collection
  //corresponding to the rule
  var collectionUri = "http://example.com/crime-alert/" + rule.id;
  var docs = cts.search(...);



  /////////////////////////////////////////////////////////////////////////////

  //format the current alert for output
  var thisAlert = {
    type: "Feature",
    properties: {
      id: rule.id,
      name: rule.name,
      events: []
    },
    geometry: geojson.toGeojson(region)
  };
  var max = 10; //maximum no. of events to show per alert rule
  var i = 0;
  for (var doc of docs) {
    //format the description of the crime report for display to the user
    var category = doc.xpath("//category/data()");
    var description = doc.xpath("//descript/data()");
    var date = doc.xpath("//date/data()");
    var title = "Crime report: " + description;
    var desc = "Date: " + date + " Category: " + category;
    var lat = doc.xpath("//location/@latitude/data()");
    var lon = doc.xpath("//location/@longitude/data()");
    var location = cts.point(lat,lon);
    var event = {
      type: "Feature",
      properties: {
        name: title,
        description: desc,
        id: fn.generateId(doc)
      },
      geometry: geojson.toGeojson(location)
    };
    thisAlert.properties.events.push(event);
    ++i;
    if (i > max) {break;}
  }
  alertList.push(thisAlert);
});

var response = {
  type: "FeatureCollection",
  features: alertList
};
response;
