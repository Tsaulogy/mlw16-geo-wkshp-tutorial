declareUpdate();

//these variables will be set by the rule when it fires
var configUri;
var doc;
var rule;
var action;

//log the input to ErrorLog.txt
xdmp.log("setcollection.sjs called with configUri = '" + configUri +
         "', doc = fn.doc('" + fn.documentUri(doc) + "'), rule = '" +
         fn.string(rule) + "', action = '" + fn.string(action) + "'");

//add the document to the collection corresponding to the rule
var docUri = fn.documentUri(doc);
var collectionUri = "http://example.com/crime-alert/" + rule.id;
xdmp.documentAddCollections( docUri, [collectionUri] );
