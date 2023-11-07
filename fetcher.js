const fs = require('fs');
const readline = require('readline');
const request = require('request');

const hostName = process.argv[2];
const saveLocation = process.argv[3];


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdin
});

fs.access(saveLocation, (err) => {
  if (!err) {
    console.log(`${saveLocation} already exists. Would you like to overwrite it? Y/N`);
    setTimeout(() => {
      console.log('No response, exiting process');
      process.exit(2);
    }, 15000);
    rl.on('line', (input) => {
      if (input === 'y' || input === 'Y') {
        console.log('Overwriting');
      }
      if (input === 'n' || input === 'N') {
        console.log('Process cancelled');
        process.exit(2);
      }
    });
  }
});

request(hostName, (error, response, body) => {
  if (error) {
    console.log(error);
    process.exit(2);
  }
  console.log('statusCode: ', response && response.statusCode);

  fs.access(saveLocation, (err) => {
    if (!err) {
      console.log(`${saveLocation} already exists. Would you like to overwrite it? Y/N`);
      setTimeout(() => {
        console.log('No response, exiting process');
        process.exit(2);
      }, 15000);
      rl.on('line', (input) => {
        if (input === 'y' || input === 'Y') {
          console.log('Overwriting');
        }
        if (input === 'n' || input === 'N') {
          console.log('Process cancelled');
          process.exit(2);
        }
      });
    }
  });
  
  fs.writeFile(saveLocation, body, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File written successfully");
      process.exit(2);
    }
  });
});

// http://www.example.edu/ ./index.html