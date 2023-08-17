// Fortune|cowsay vaquita Server using Node.js and Express 
// Bernardo F Martinez Meave

//URL https://Server:3333/fortune Only fortune text
//URL https://Server:3333/vaquita Vaquita format
//URL https://Server:3333/fortunejson Fortune JSON format

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
        res.send(`<pre>${stdout}</pre>`);
        console.log(stdout) //Send command output to stdout
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
        res.send(`<pre>${stdout}</pre>`); //Send command output to stdout
      }
    });
  });

  //JSON format
  app.get(jsonURL, (req, res) => {
    const command = 'fortune -c'; // Linux command
  
    exec(command, (error, stdout, stderr) => {
      if (error) {
        res.status(500).send(`Error executing command: ${error.message}`); // If generic error produced 500 error
      } else if (stderr) {
        res.status(500).send(`Command stderr: ${stderr}`); // If stderr message produced 500 error
      } else {
        const stdoutput = stdout;
        const fortuneType = stdoutput.match(/\((.*?)\)/g); // Parse fortune type between ()
        //console.log(fortuneType);
        const fortuneText = stdoutput.match(/(?<=%)([\s\S]*)/); // Parse text after type ()
        res.json({ 
            fortunetype:`${fortuneType}`,
            fortunetext:`${fortuneText}`
            }); //Send command output in JSON format
      }
    });
  });


  app.listen(port, () => {
    console.log(`Fortune Vaquita Server listening on port ${port}`);
  });