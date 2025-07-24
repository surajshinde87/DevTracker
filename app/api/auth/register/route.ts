// Importing Next.js request and response utilities for API routes
import { NextRequest, NextResponse } from 'next/server';

// Import bcrypt for securely hashing passwords
import bcrypt from 'bcryptjs';

// Import the MongoDB connection utility
import { connectToDB } from '@/lib/mongodb';

// Import the User model/schema
import User from '@/models/User';

// Import the JWT signing utility function
import { signToken } from '@/lib/jwt';

// Handles POST requests for user registration
export async function POST(req: NextRequest) {
  try {
    // Extract required fields from the request body (sent from frontend)
    const {
      fullName,
      email,
      password,
      role,
      skills,
      authProvider = 'credentials', // Default is credentials if not provided (e.g., email/pass)
    } = await req.json();

    // Connect to the MongoDB database
    await connectToDB();

    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If user already exists, return an error response
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash the password using bcrypt (12 rounds of salting)
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user document in the database
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword, // Store only the hashed password
      role,
      skills,
      authProvider,
    });

    // Generate a JWT token for the newly created user
    const token = signToken({ userId: newUser._id, email: newUser.email });

    // Prepare the response and set a secure cookie with the token
    const response = NextResponse.json(
      {
        message: 'User registered',
        user: newUser, // You might want to exclude password before sending
      },
      { status: 201 } // HTTP 201: Created
    );

    // Set the JWT token as an HTTP-only cookie
    response.cookies.set('devtracker_token', token, {
      httpOnly: true, // Cannot be accessed by JavaScript on the client (more secure)
      secure: process.env.NODE_ENV === 'production', // Send over HTTPS only in production
      sameSite: 'strict', // Prevent CSRF
      path: '/', // Cookie accessible on entire site
      maxAge: 60 * 60 * 24 * 7, // Expires in 7 days
    });

    return response;

  } catch (error) {
    // Log error and return a generic server error message
    console.error('[Signup Error]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
