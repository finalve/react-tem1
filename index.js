const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');


const cors = require('cors');
const Routes = require('./App/Routes');
const config = require('./config');
const db = require("./App/Models");
const app = express();
const port = 6080;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', Routes);

app.use((err, req, res, next) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      next();
    }
  });

  
const server = app.listen(port, () => console.log(`app listening on port ${port}!`));

const Role = db.role;
mongoose.connect(`mongodb+srv://${config.root}:${config.pwd}@cluster0.2hz2bzb.mongodb.net/${config.db}`, { useNewUrlParser: true }).then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
})
    .catch(err => {
        console.error("Connection error", err);
    });

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}