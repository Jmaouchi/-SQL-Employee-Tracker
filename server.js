const express = require('express');
const db = require('./config/connection');
const inquirer = require('inquirer');


//Set up a port 
const PORT = process.env.PORT || 2999;

const app = express();


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// this will be the last 
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
   startPrompt();
});


// start prompting the 

