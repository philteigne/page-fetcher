const fs = require('fs');
const readline = require('readline');
const request = require('request');

const hostName = process.argv[2];
const saveLocation = process.argv[3];

const writeFile = (body) => {
  fs.writeFile(saveLocation, body, (err) => {
    if (err) {
      if (err.errno === -13) {
        console.log('Error: Invalid path');
        return;
      }
      console.log(err);
    } else {
      console.log("File written successfully");
      return;
    }
  });
};

const fetchRequest = () => {
  request(hostName, (error, response, body) => {
    if (error) {
      console.log(error);
      return;
    } else {
      fs.access(saveLocation, (err) => {
        if (!err) {
          console.log(`${saveLocation} already exists. Would you like to overwrite it? Y/N`);

          const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdin
          });

          rl.on('line', (input) => {
            if (input === 'y' || input === 'Y') {
              console.log('Overwriting');
              writeFile(body);
            }
            if (input === 'n' || input === 'N') {
              console.log('Process cancelled');
            }
            rl.close();
          });

        } else {
          writeFile(body);
        }
      });
      
    }
  });
};

if (!hostName || !saveLocation) {
  console.log('Please enter a URL and location');
} else {
  fetchRequest();
}