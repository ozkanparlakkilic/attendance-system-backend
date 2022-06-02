import mongoose from "mongoose";

const connectDB = async () => {
  const mongoDbUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.b1oou.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
  try {
    const conn = await mongoose.connect(mongoDbUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
