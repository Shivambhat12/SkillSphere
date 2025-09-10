import express from "express";

// cors is used so that our backend can get connected with ant domain
import cors from "cors";

// for .env file
import "dotenv/config";

// getting the connectdb function from the config folder
import connectDB from "./configs/mongodb.js";
import clerkWebhooks from "./controllers/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import connectCloudinary from "./configs/coudinary.js";
import courseRouter from "./routes/courseRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { stripeWebhooks } from "./controllers/webhooks.js";

// creating the instance app of the express
const app = express();

// connectiong to the database
await connectDB();
// connectiong to the cloudinary
await connectCloudinary();

// middleware to use the cors
app.use(cors());
// this middlelware will add the auth property to the req body
app.use(clerkMiddleware());

// server will be listening on this port
const PORT = process.env.PORT || 5000;

// routes
app.get("/", (req, res) => {
  res.send("hi from server");
});
app.post("/clerk", express.json(), clerkWebhooks);
app.use("/api/educator", express.json(), educatorRouter);
app.use("/api/course", express.json(), courseRouter);
app.use("/api/user", express.json(), userRouter);
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
