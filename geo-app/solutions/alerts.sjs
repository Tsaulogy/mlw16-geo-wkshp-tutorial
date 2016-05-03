var alert = require("/MarkLogic/alert.xqy");
var geojson = require('/MarkLogic/geospatial/geojson.xqy');

////////////////////////////////////////////////////////////////////////////////



var rules = alert.getAllRules("http://example.com/crime-alert", cts.trueQuery());



////////////////////////////////////////////////////////////////////////////////

var alertList = [];
rules.forEach(function(rule) {

  //////////////////////////////////////////////////////////////////////////////



  var region = cts.elementAttributePairGeospatialQueryRegion(alert.ruleGetQuery(rule));



  var uri = "http://example.com/crime-alert/" + rule.id;
  var qry = cts.collectionQuery([uri]);
  var docs = cts.search(qry);



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
