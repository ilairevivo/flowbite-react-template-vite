const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors(
    
    {
        origin: [
            "http://localhost:8181",
            "http://localhost:3000",
            "http://127.0.0.1:5500",
        ],
        optionsSuccessStatus: 200,
    }
  ));
app.get("/", (req, res) => {
    res.json({ message: "success" });
});

  
module.exports = app;