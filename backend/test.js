const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://khushikhore680:khore123@cluster0.c8pjwmu.mongodb.net/?appName=Cluster0/oplog.rs";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully!");
  } catch (err) {
    console.log("ERROR:", err.message);
  } finally {
    await client.close();
  }
}

run();