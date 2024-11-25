// app/api/todos/[id]/route.js

import { todos } from '../data';

export async function PUT(request, { params }) {
  const { id } = params;
  const todoIndex = todos.findIndex((t) => t.id === parseInt(id, 10));
  if (todoIndex === -1) {
    return new Response(JSON.stringify({ error: 'Todo not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  try {
    const updatedData = await request.json();
    todos[todoIndex] = { ...todos[todoIndex], ...updatedData };
    return new Response(JSON.stringify(todos[todoIndex]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid data' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  const todoIndex = todos.findIndex((t) => t.id === parseInt(id, 10));
  if (todoIndex === -1) {
    return new Response(JSON.stringify({ error: 'Todo not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  todos.splice(todoIndex, 1);
  return new Response(null, { status: 204 });
}
