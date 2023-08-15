// Fortune|cowsay vaquita Server using Node.js and Express 
// Bernardo F Martinez Meave

//URL https://Server:3333/fortune

const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3333;

app.get('/fortune', (req, res) => {
    const command = 'fortune | cowsay -f apt'; // Linux command
  
    exec(command, (error, stdout, stderr) => {
      if (error) {
        res.status(500).send(`Error executing command: ${error.message}`);
      } else if (stderr) {
        res.status(500).send(`Command stderr: ${stderr}`);
      } else {
        res.send(`<pre>${stdout}</pre>`);
      }
    });
  });
  
  
  app.listen(port, () => {
    console.log(`Fortune Vaquita Server listening on port ${port}`);
  });