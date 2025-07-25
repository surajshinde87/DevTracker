// app/api/auth/login/route.ts

import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from "@/lib/mongoose";
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    await connectToDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!user.password) {
      return NextResponse.json({ error: 'Password not set for this account' }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({ message: 'Login successful' });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('[Login Error]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
