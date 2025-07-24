import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) throw new Error('Please define the MONGODB_URI in .env.local');

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log('[✅ DB Connected]: MongoDB connection established');
  } catch (error) {
    console.error('[❌ DB Connection Failed]:', error);
    throw error;
  }

  return cached.conn;
}
