// src/app/api/todos/[id]/route.js

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const { completed } = await request.json();

    if (typeof completed !== 'boolean') {
      return NextResponse.json({ error: 'Invalid completed status' }, { status: 400 });
    }

    const existingTodo = await prisma.todo.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existingTodo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: parseInt(id, 10) },
      data: { completed },
    });

    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    console.error(`PUT /api/todos/${id} error:`, error);
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    const existingTodo = await prisma.todo.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existingTodo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    await prisma.todo.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json({ message: 'Todo deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(`DELETE /api/todos/${id} error:`, error);
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}
