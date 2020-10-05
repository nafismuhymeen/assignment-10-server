const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const uri = "mongodb+srv://volunEvents:nafis1234@cluster0.fuupg.mongodb.net/Volunteer-Network?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const port = 5000;
app.use(cors())
app.use(bodyParser.json())


// Event DataBase
client.connect(err => {
  const events = client.db("Volunteer-Network").collection("Events");
    app.get('/events',(req, res)=>{
        events.find({})
        .toArray((err, documents)=>{
            res.send(documents);
        })
    })
    app.post('/addevent',(req, res)=>{
      const addEvent = req.body;
      events.insertOne(addEvent);
    })
});

// Volunteer DataBase
client.connect(err => {
  const volunteers = client.db("Volunteer-Network").collection("Volunteers");
    app.post('/volunteers',(req, res)=>{
      const myEvents = req.body;
      volunteers.insertOne(myEvents)
    })
    app.get('/myevents', (req, res)=>{
      volunteers.find({email: req.query.email})
      .toArray((err, documents)=>{
        res.send(documents);
      })
    })
    app.get('/allvolunts', (req, res)=>{
      volunteers.find({})
      .toArray((err, documents)=>{
        res.send(documents);
      })
    })
    app.delete(`/deleteevent/:id`, (req, res)=>{
      volunteers.deleteOne({_id : ObjectId(req.params.id)})
      .then(result =>{
        console.log(result);
      })
    })
});


app.get('/', function (req, res) {
    res.send('nodemon working')
  })


app.listen(port)