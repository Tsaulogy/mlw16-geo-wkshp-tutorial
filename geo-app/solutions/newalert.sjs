var geojson = require('/MarkLogic/geospatial/geojson.xqy');
var alert = require("/MarkLogic/alert.xqy");

//since we will be inserting into the database, we must call declareUpdate
declareUpdate();

//decode the user's input
var rawInput = xdmp.getRequestBody();
var input = rawInput.toObject();

//log the input to ErrorLog.txt
xdmp.log("Input received by newalert.sjs: " + xdmp.quote(rawInput));

//the name of the new alert comes from input.searchString
var name = input.searchString;
//store the input region(s) in the searchRegions array
var searchRegions = [];
var message = "New alert created: " + name;
if (input.searchRegions.features.length == 0) {
  //no region provided: error
  message = "ERROR: No region provided. Alert not created.";
} else {
  for (var i = 0; i < input.searchRegions.features.length; i++) {
    //parse the input regions from GeoJSON.
    var r = geojson.parseGeojson(input.searchRegions.features[i].geometry);
    searchRegions.push(r);
  }

  //////////////////////////////////////////////////////////////////////////////



  var geoQuery = cts.elementAttributePairGeospatialQuery(
    xs.QName("location"),
    xs.QName("latitude"),
    xs.QName("longitude"),
    searchRegions);

  alert.ruleInsert(
    "http://example.com/crime-alert",
    alert.makeRule(
      name,
      name,
      "0",
      geoQuery,
      "set-collection",
      {}));



  //////////////////////////////////////////////////////////////////////////////

}

//return the success or error message to the front-end.
var response = {"message": message};
response;
