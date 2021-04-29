import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import db from './src/models'
// Config
import dbConfig from './src/config/db.config'

import routes from './src/routes/index'

//const cors = require("cors");

//const db = require("./app/models");
//const dbConfig = require("./app/config/db.config");
const Role = db.role;

const app = express();

var corsOptions = {
  origin: "http://localhost:8083"
};


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (_req, res) => {
  res.json({ message: "Welcome to ordering application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use(routes);

db.mongoose
  .connect(`mongodb://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err: any) => {
    console.error("Connection error", err);
    process.exit();
  });

  

  const initial = () =>  {
    console.log("llegue a crear roles")
    Role.estimatedDocumentCount((err: any, count: number) => {
      if (!err && count === 0) {
        new Role({
          name: "administrator"
        }).save((err: any) => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'administrator' to roles collection");
        });
  
        new Role({
          name: "employee"
        }).save((err: any) => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'employee' to roles collection");
        });
  
        new Role({
          name: "customer"
        }).save((err: any) => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'customer' to roles collection");
        });
      }
      else{
        console.log("error", err);
      }
    });

    
  }