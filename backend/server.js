const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require('dns');

// Force Node's resolver to use public DNS servers (fixes local DNS proxies
// that refuse SRV queries and cause `querySrv ECONNREFUSED` errors).
dns.setServers(['8.8.8.8', '1.1.1.1']);
console.log('DNS servers:', dns.getServers());

const itemRoutes = require("./routes/itemRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Simple request logger to help debug routing issues
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.originalUrl);
  next();
});

mongoose.connect("mongodb+srv://khushikhore680:khore123@cluster0.c8pjwmu.mongodb.net/?appName=Cluster0/oplog.rs")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

app.use("/api/items", itemRoutes);

app.get("/", (req, res) => {
  res.send("Lost & Found API Running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});