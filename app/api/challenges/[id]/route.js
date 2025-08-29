import dbConnect from '@/lib/mongodb';
import Challenge from '@/models/Challenge';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response('Unauthorized', { status: 401 });
  
  await dbConnect();
  const { id } = params;
  
  try {
    await Challenge.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Failed to delete challenge' }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response('Unauthorized', { status: 401 });
  
  await dbConnect();
  const { id } = params;
  
  try {
    const updateData = await request.json();
    const challenge = await Challenge.findByIdAndUpdate(
      id, 
      { 
        ...updateData, 
        completedAt: updateData.completed ? new Date() : undefined 
      },
      { new: true }
    );
    return Response.json(challenge);
  } catch (error) {
    return Response.json({ error: 'Failed to update challenge' }, { status: 500 });
  }
}
