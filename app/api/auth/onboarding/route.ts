// Import helper function to verify JWT tokens
import { verifyToken } from '@/lib/jwt';
// Import Next.js server-side request/response utilities
import { NextRequest, NextResponse } from 'next/server';
// Import MongoDB connection utility
import { connectToDB } from '@/lib/mongodb';
// Import User model from the database
import User from '@/models/User';

// API Route: Handles POST requests for saving onboarding data
export async function POST(req: NextRequest) {
  try {
    // Get the token from cookies (specifically from the cookie named 'devtracker_token')
    const token = req.cookies.get('devtracker_token')?.value;

    // If token is missing, respond with 401 Unauthorized
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Decode the token to extract user info (like email)
    const decoded: any = verifyToken(token);
    const email = decoded.email;

    // Extract onboarding data from the request body
    const { role, skills, aiRoadmap, editedRoadmap } = await req.json();

    // If email is missing in the token, return 400 Bad Request
    if (!email) {
      return NextResponse.json({ error: 'Email is missing in token' }, { status: 400 });
    }

    // Establish connection to the MongoDB database
    await connectToDB();

    // Find the user by email and update their onboarding data
    const user = await User.findOneAndUpdate(
      { email }, // Find the user with this email
      { role, skills, aiRoadmap, editedRoadmap }, // Update these fields
      { new: true } // Return the updated user document
    );

    // If user is not found in the database, respond with 404 Not Found
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // If everything is successful, return a success message with updated user data
    return NextResponse.json({
      message: 'Onboarding data saved',
      user: user.toObject(),
    });
  } catch (error) {
    // Log the error for debugging
    console.error('[Onboarding Save Error]', error);
    // Respond with 500 Internal Server Error if something goes wrong
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
