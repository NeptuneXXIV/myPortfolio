import { createClient } from '@sanity/client';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const writeToken = process.env.SANITY_WRITE_TOKEN;
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

    // Zero-config safety: If database keys are not fully set up,
    // simulate successful form submission in local mock mode!
    if (!writeToken || !projectId || projectId === 'mock_project_id') {
      console.warn('⚡ CONTACT_API: Missing SANITY_WRITE_TOKEN or Project ID. Simulating successful local form transmission.');
      return NextResponse.json({ success: true, simulated: true });
    }

    // Create write-privileged Sanity client
    const writeClient = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      token: writeToken,
      useCdn: false,
      apiVersion: '2026-05-24',
    });

    // Create a new contact message document in the database
    await writeClient.create({
      _type: 'contactMessage',
      name,
      email,
      message,
      sentAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
