const fs = require('fs');
const readline = require('readline');
const request = require('request');

const hostName = process.argv[2];
const saveLocation = process.argv[3];

request(hostName, (error, response, body) => {
  console.log('error: ', error);
  console.log('statusCode: ', response && response.statusCode);
  fs.writeFile(saveLocation, body, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File written successfully");
    }
  });
});

http://www.example.edu/ ./index.html