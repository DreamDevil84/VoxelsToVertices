var http = require('http');
var fs = require('fs');
var url = require('url');
var converter = require('./MRIVoxelConverter');

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  var q = url.parse(req.url, true).query;
  var pathFrom = q.from;
  var pathTo = q.to;
  var name = q.name;
  var minIntensity = q.minIntensity;
  var stretch = q.stretch;
  var fileType = q.fileType || 'obj';
  // var text = pathFrom + " " + pathTo;
  // res.write("Working");

  //  Template shape, for development
  var shape =
    [
      [
        [0, 1, 2], [0, 1, 2], [0, 1, 2]
      ],
      [
        [0, 1, 2], [0, 1, 2], [0, 1, 2]
      ],
      [
        [0, 1, 2], [0, 1, 2], [0, 1, 2]
      ]
    ];
  if (pathFrom && pathTo && name && minIntensity) {
    fs.readFile(pathFrom, function (err, data) {
      data = JSON.parse(data);
      shape = converter.convertMRI(data, minIntensity, stretch);

      if (fileType === 'both') {
        let objString = converter.writeOBJ(shape[0], shape[1], shape[2]);
        fs.writeFile(pathTo + '\\' + name + '.obj', objString, function (err) {
          if (err) throw err;
          console.log("OBJ file written.");
        });
        let jsonData = converter.writeJSON(shape[0], shape[1]);
        fs.writeFile(pathTo + '\\' + name + '.json', jsonData, function (err) {
          if (err) throw err;
          console.log("JSON file written.");
        });
      } else if (fileType === 'json') {
        let jsonData = converter.writeJSON(shape[0], shape[1]);
        fs.writeFile(pathTo + '\\' + name + '.json', jsonData, function (err) {
          if (err) throw err;
          console.log("JSON file written.");
        });
      } else {
        let objString = converter.writeOBJ(shape[0], shape[1], shape[2]);
        fs.writeFile(pathTo + '\\' + name + '.obj', objString, function (err) {
          if (err) throw err;
          console.log("OBJ file written.");
        });
      };
      // res.write("Done");
      res.end();
    });
  } else {
    console.log("Missing parameters, try again");
  }
  // process.exitCode = 1;
}).listen(8080);