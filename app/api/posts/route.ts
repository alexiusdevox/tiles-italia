import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const products = await prisma.post.findMany();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const json = await request.json();
  const post = await prisma.post.create({
    data: json,
  });
  return new NextResponse(JSON.stringify(post), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PUT(request: Request) {
  const json = await request.json();
  const post = await prisma.post.update({
    where: { id: json.id },
    data: json,
  });
  return NextResponse.json(post);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.post.delete({
    where: { id },
  });
  return new NextResponse(null, { status: 204 });
}