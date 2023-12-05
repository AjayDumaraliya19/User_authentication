import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const connectDB = async () => {
  try {
    const connectionInstent = await mongoose.connect(
      `${process.env.MONGODB_URL}/${process.env.DB_NAME}`
    );

    console.log(
      `\nMongoDB Database connection Successfully..! on DB HOST:${connectionInstent.connection.host}`
    );
  } catch (error) {
    console.log(`MongoDB database connection faild ..! : err`);
    process.exit(1);
  }
};

export default connectDB;
