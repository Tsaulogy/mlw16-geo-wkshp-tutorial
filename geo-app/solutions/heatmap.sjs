var geojson = require('/MarkLogic/geospatial/geojson.xqy');

//decode the user's input
var rawInput = xdmp.getRequestBody();
var input = rawInput.toObject();

//log the input to ErrorLog.txt
xdmp.log("Input received by heatmap.sjs: " + xdmp.quote(rawInput));

//divide the user's map window into a 50x50 grid. store the divided lats and longs in arrays
var bounds = cts.box.apply(null,input.mapWindow);
var dlat = (cts.boxNorth(bounds) - cts.boxSouth(bounds))/50;
var dlong = (cts.boxEast(bounds) - cts.boxWest(bounds))/50;
var lats = [];
var longs = [];
for (var i = 0; i < 50; ++i) {
  lats[i] = cts.boxSouth(bounds) + dlat * i;
  longs[i] = cts.boxWest(bounds) + dlong * i;
}

////////////////////////////////////////////////////////////////////////////////



var qry = cts.trueQuery();
if (input.searchString != "")
  qry = cts.wordQuery(input.searchString);

//results should be an array of triples: [lat, long, intensity] with intensity between 0 and max
var max = 0;
var results = [];
for (var box of cts.elementAttributePairGeospatialBoxes(
  xs.QName("location"), xs.QName("latitude"), xs.QName("longitude"),
  lats, longs, [], qry))
{
  var p = geo.approxCenter(box);
  var lat = cts.pointLatitude(p);
  var long = cts.pointLongitude(p);
  var f = cts.frequency(box);
  results.push([lat, long, f]);
  max = fn.max([f, max]);
};



////////////////////////////////////////////////////////////////////////////////

//return the results to the front-end
var message = "Displaying heatmap results.";
var response = {
  message: message,
  results: results,
  max: max
};
response;
