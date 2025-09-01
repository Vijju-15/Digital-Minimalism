import dbConnect from '@/lib/mongodb';
import Goal from '@/models/Goal';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response('Unauthorized', { status: 401 });
  
  await dbConnect();
  const { id } = params;
  
  try {
    await Goal.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Failed to delete goal' }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response('Unauthorized', { status: 401 });
  
  await dbConnect();
  const { id } = params;
  
  try {
    const updateData = await request.json();
    const goal = await Goal.findByIdAndUpdate(
      id, 
      { 
        ...updateData, 
        completedAt: updateData.completed ? new Date() : undefined 
      },
      { new: true }
    );
    return Response.json(goal);
  } catch (error) {
    return Response.json({ error: 'Failed to update goal' }, { status: 500 });
  }
}
