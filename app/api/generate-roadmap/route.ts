import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { role, skills } = await req.json();

  const prompt = `
You are an expert AI career coach.
Based on role "${role}" and known skills (${skills.join(', ')}), generate a clear step-by-step learning roadmap.
Format as:
1. Learn ...
2. Master ...
3. Explore ...
Ensure 8-10 steps in total.
`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama3-70b-8192',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Groq API Error:', errorText);
    return NextResponse.json({ aiRoadmap: '⚠️ Failed to generate roadmap from AI.' });
  }

  const data = await response.json();
  console.log('Groq Response:', JSON.stringify(data, null, 2)); // <-- Check this in your logs.

  const aiRoadmap = data?.choices?.[0]?.message?.content || '⚠️ No roadmap generated.';

  return NextResponse.json({ aiRoadmap });
}
