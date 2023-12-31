// Fortune|cowsay vaquita Server using Node.js and Express 
// Bernardo F Martinez Meave

//URL https://Server:3333/fortune Only fortune text
//URL https://Server:3333/vaquita Vaquita format
//URL https://Server:3333/fortunejson Fortune JSON format


// Access command-line arguments
const arguments = process.argv.slice(2);
let delay = 0;
// Check if arguments were provided
if (arguments.length === 0) {
  console.log("Fetch Delay is 0s / Usage: node FortuneServer.js delayInmilliseconds");
} else {
  console.log("Fetch Delay: ", arguments[0] + " milliseconds");
  delay = arguments[0];
}

const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3333; // Listening TCP Port 

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//URLs definition
const vaquitaURL = '/vaquita';
const fortuneURL = '/fortune';
const jsonURL = '/fortunejson';

// Text Vaquita Format
app.get(vaquitaURL, (req, res) => {
    const command = 'fortune | cowsay -f apt'; // Linux command
  
    exec(command, (error, stdout, stderr) => {
      if (error) {
        res.status(500).send(`Error executing command: ${error.message}`); // If generic error produced 500 error
      } else if (stderr) {
        res.status(500).send(`Command stderr: ${stderr}`); // If stderr message produced 500 error
      } else {
        console.log(stdout) //Send command output to stdout
        res.send(`<pre>${stdout}</pre>`);
      }
    });
  });
  
// Text Fortune only
  app.get(fortuneURL, (req, res) => {
    const command = 'fortune'; // Linux command
  
    exec(command, (error, stdout, stderr) => {
      if (error) {
        res.status(500).send(`Error executing command: ${error.message}`); // If generic error produced 500 error
      } else if (stderr) {
        res.status(500).send(`Command stderr: ${stderr}`); // If stderr message produced 500 error
      } else {
        console.log("FORTUNE TEXT: " + stdout) //Send command output to stdout
        res.send(`<pre>${stdout}</pre>`);
      }
    });
  });

  //JSON format
  app.get(jsonURL, (req, res) => {

    //const delay = 2000;  //Delay in milliseconds (2 sec)

    setTimeout(() => {
        const command = 'fortune -c'; // Linux command
      
        exec(command, (error, stdout, stderr) => {
          if (error) {
            res.status(500).send(`Error executing command: ${error.message}`); // If generic error produced 500 error
          } else if (stderr) {
            res.status(500).send(`Command stderr: ${stderr}`); // If stderr message produced 500 error
          } else {
            const stdoutput = stdout;
            //console.log ('stdout: ' + stdout)
            const fortuneType = stdoutput.match(/\((.*?)\)/g);
            //console.log('TYPE: ' + fortuneType); // Parse fortune type between ()
            const fortuneText = stdoutput.match(/(?<=%)([\s\S]*)/); // Parse text after type ()
            
            var obj = new Object();
            obj.fortunetype = fortuneType;
            obj.fortunetext = fortuneText;
            var jsonString = JSON.stringify(obj);

            const timestamp = new Date().toLocaleString();

            console.log(timestamp + ' DELAY: ' + delay + 'ms' + ' FORTUNE TEXT JSON: ' + jsonString);

            res.send(jsonString); //Send command output in JSON format
          }
        });
      }, delay);
  });

  app.listen(port, () => {
    console.log(`Fortune Vaquita Server listening on port ${port}`);
  });