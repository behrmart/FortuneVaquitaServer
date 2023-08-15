// Fortune|cowsay vaquita Server using Node.js and Express 
// Bernardo F Martinez Meave

//URL https://Server:3333/fortune Only fortune text
//URL https://Server:3333/vaquita Vaquita format
//URL https://Server:3333/fortunejson Fortune JSON format

const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3333; // Listening TCP Port 

app.get('/vaquita', (req, res) => {
    const command = 'fortune | cowsay -f apt'; // Linux command
  
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
  
  app.get('/fortune', (req, res) => {
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

  app.get('/fortunejson', (req, res) => {
    const command = 'fortune'; // Linux command
  
    exec(command, (error, stdout, stderr) => {
      if (error) {
        res.status(500).send(`Error executing command: ${error.message}`); // If generic error produced 500 error
      } else if (stderr) {
        res.status(500).send(`Command stderr: ${stderr}`); // If stderr message produced 500 error
      } else {
        res.json({ fortune: `${stdout}`}); //Send command output in JSON format
      }
    });
  });



  app.listen(port, () => {
    console.log(`Fortune Vaquita Server listening on port ${port}`);
  });