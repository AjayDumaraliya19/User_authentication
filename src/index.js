import dotenv from "dotenv";
import connectDB from "./db/dbconnection.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5003, () => {
      console.log(`Server runnig at the port no.:http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`MongoDB connection failed..! ${err}`);
  });
