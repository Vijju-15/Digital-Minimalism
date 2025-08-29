import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request) {
  await dbConnect();
  const users = await User.find({});
  return Response.json(users);
}

export async function POST(request) {
  await dbConnect();
  const { name, email } = await request.json();
  const user = await User.create({ name, email });
  return Response.json(user);
}
