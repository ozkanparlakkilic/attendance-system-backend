import mongoose from "mongoose";

const connectDB = async () => {
  const mongoDbUrl = process.env.MONGO_URI;
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
