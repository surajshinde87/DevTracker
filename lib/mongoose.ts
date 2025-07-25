// lib/mongoose.ts

import mongoose from "mongoose";

export async function connectToDB() {
  if (mongoose.connections[0].readyState) {
    // Already connected
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI!, {
    dbName: 'your_db_name_here', // replace with your database name
  });

  console.log("Connected to MongoDB with Mongoose");
}
