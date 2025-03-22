import express from "express";
// cors is used so that our backend can get connected with ant domain
import cors from "cors";
// for .env file
import "dotenv/config";
// creating the instance app of the express
const app = express();
// middleware to use the cors
app.use(cors());
// server will be listening on this port
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hi from server");
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
