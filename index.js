const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

var uri =
  "mongodb://dataStore:oXkDEvCzNkGC2dJL@cluster0-shard-00-00.kciot.mongodb.net:27017,cluster0-shard-00-01.kciot.mongodb.net:27017,cluster0-shard-00-02.kciot.mongodb.net:27017/CarsPartsCollection?ssl=true&replicaSet=atlas-x2gpcv-shard-0&authSource=admin&retryWrites=true&w=majority";
MongoClient.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
  const hyundaiCollection = client
    .db("CarPartsCollection")
    .collection("Hyundai");

    const mahindraCollection = client
    .db("CarPartsCollection")
    .collection("Mahindra");

    const tataCollection = client
    .db("CarPartsCollection")
    .collection("Tata");

    //hyundai data
  const postHyundaiData = (req, res) => {
    try {
      const product = req.body;
      hyundaiCollection.insertOne(product)
        .then((result) => {
          res.status(200)
        })
    } catch (error) {
      res.status(404).json({ massage : error.massage })
    }
  }


  const getProductData = (req, res) => {
    try {
      hyundaiCollection.find({})
        .toArray((err, documents) => {
          res.send(documents)
        })
        res.status(200);
    } catch (error) {
      res.status(404).json({ massage: error.massage })
    }
  }

  app.post("/hyundaiData", postHyundaiData);
  app.get("/getHyundai", getProductData)


  //mahindra data
  const postMahindraData = (req, res) => {
    try {
      const product = req.body;
      mahindraCollection.insertOne(product)
        .then((result) => {
          res.status(200)
        })
    } catch (error) {
      res.status(404).json({ massage : error.massage })
    }
  }


  const getMahindraData = (req, res) => {
    try {
      mahindraCollection.find({})
        .toArray((err, documents) => {
          res.send(documents)
        })
        res.status(200);
    } catch (error) {
      res.status(404).json({ massage: error.massage })
    }
  }



  app.post("/mahindraData", postMahindraData );
  app.get("/getMahindra", getMahindraData )


  //Tata data
  const postTataData = (req, res) => {
    try {
      const product = req.body;
      tataCollection.insertOne(product)
        .then((result) => {
          res.status(200)
        })
    } catch (error) {
      res.status(404).json({ massage : error.massage })
    }
  }

  const getTataData = (req, res) => {
    try {
      tataCollection.find({})
        .toArray((err, documents) => {
          res.send(documents)
        })
        res.status(200);
    } catch (error) {
      res.status(404).json({ massage: error.massage })
    }
  }

  app.post("/tataData", postTataData );
  app.get("/getTata", getTataData )


  if (err) {
    console.log("connection failed");
  } else {
    console.log("connection success");
  }
});

app.listen(process.env.PORT || port);
