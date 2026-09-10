import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filepath = searchParams.get('path');
  if (!filepath) return NextResponse.json({ error: 'Path required' }, { status: 400 });

  try {
    const fullPath = path.join(process.cwd(), filepath);
    const content = await fs.readFile(fullPath, 'utf8');
    return NextResponse.json({ content });
  } catch (e) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const filepath = searchParams.get('path');
  if (!filepath) return NextResponse.json({ error: 'Path required' }, { status: 400 });

  try {
    const body = await request.json();
    const fullPath = path.join(process.cwd(), filepath);
    
    // Ensure directory exists
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    
    await fs.writeFile(fullPath, body.content || '', 'utf8');
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Could not save file' }, { status: 500 });
  }
}
