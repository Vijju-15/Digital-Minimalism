import dbConnect from '@/lib/mongodb';
import Log from '@/models/Log';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response('Unauthorized', { status: 401 });
  await dbConnect();
  const logs = await Log.find({ user: session.user.id });
  return Response.json(logs);
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response('Unauthorized', { status: 401 });
  await dbConnect();
  const data = await request.json();
  const log = await Log.create({ ...data, user: session.user.id });
  return Response.json(log);
}
