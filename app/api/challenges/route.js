import dbConnect from '@/lib/mongodb';
import Challenge from '@/models/Challenge';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response('Unauthorized', { status: 401 });
  await dbConnect();
  const challenges = await Challenge.find({ user: session.user.id });
  return Response.json(challenges);
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response('Unauthorized', { status: 401 });
  await dbConnect();
  const data = await request.json();
  const challenge = await Challenge.create({ ...data, user: session.user.id });
  return Response.json(challenge);
}
