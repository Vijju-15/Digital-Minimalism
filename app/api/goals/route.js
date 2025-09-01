import dbConnect from '@/lib/mongodb';
import Goal from '@/models/Goal';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response('Unauthorized', { status: 401 });
  await dbConnect();
  const goals = await Goal.find({ user: session.user.id });
  return Response.json(goals);
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response('Unauthorized', { status: 401 });
  await dbConnect();
  const data = await request.json();
  const goal = await Goal.create({ ...data, user: session.user.id });
  return Response.json(goal);
}
