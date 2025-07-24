//  Import required packages
import bcrypt from 'bcryptjs'; // For comparing hashed passwords
import { signToken } from '@/lib/jwt'; // Custom function to sign a JWT
import { NextRequest, NextResponse } from 'next/server'; // Next.js request and response objects
import { connectToDB } from '@/lib/mongodb'; // MongoDB connection utility
import User from '@/models/User'; // User model from Mongoose

//  POST handler for /api/auth/login
export async function POST(req: NextRequest) {
  try {
    //  Extract email and password from the request body
    const { email, password } = await req.json();

    //  Connect to MongoDB
    await connectToDB();

    //  Check if a user with the given email exists
    const user = await User.findOne({ email });

    if (!user) {
      //  If user is not found, return 404 Not Found
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    //  Compare the plain password with the hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      //  If password does not match, return 401 Unauthorized
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    //  If credentials are valid, generate JWT token
    const token = signToken({
      id: user._id,
      email: user.email,
      role: user.role, // Optional: useful for role-based access
    });

    //  Prepare the response with success message
    const response = NextResponse.json({ message: 'Login successful' });

    //  Set HTTP-only cookie with the token
    response.cookies.set({
      name: 'token', // Cookie name
      value: token, // JWT token value
      httpOnly: true, // Prevents client-side JS from accessing the token (security)
      secure: process.env.NODE_ENV === 'production', // Use HTTPS only in production
      sameSite: 'lax', // Prevents CSRF for most cases while allowing cookies on same-site navigation
      path: '/', // Cookie is valid for entire site
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    //  Return the response
    return response;
  } catch (error) {
    //  Handle unexpected errors
    console.error('[Login Error]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
