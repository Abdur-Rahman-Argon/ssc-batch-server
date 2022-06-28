const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// XFanxuna9BF20CGz;

var uri =
  "mongodb://AmraBondho:XFanxuna9BF20CGz@ac-hesibwa-shard-00-00.wjqlkxf.mongodb.net:27017,ac-hesibwa-shard-00-01.wjqlkxf.mongodb.net:27017,ac-hesibwa-shard-00-02.wjqlkxf.mongodb.net:27017/?ssl=true&replicaSet=atlas-f5hxb2-shard-0&authSource=admin&retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();

    const studentsCollection = client
      .db("StudentData")
      .collection("StudentsInformation");

    app.get("/data", (req, res) => {
      res.send("data all  here");
    });

    app.get("/getStudentsInfo", async (req, res) => {
      const query = {};
      const cursor = studentsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/addStudentsInfo", async (req, res) => {
      const studentsInfo = req.body;
      const result = await studentsCollection.insertOne(studentsInfo);
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server is  radey for working");
});

app.listen(port, () => {
  console.log("server is connect port", port);
});
