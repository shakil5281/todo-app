'use client';

import { useState, useEffect } from 'react';
import TodoItem from '@/components/TodoItem';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos from the backend
  useEffect(() => {
    fetch('/api/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  }, []);

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo, completed: false }),
    });
    if (res.ok) {
      const todo = await res.json();
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const deleteTodo = async (id) => {
    const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t.id === id);
    const res = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...todo, completed: !todo.completed }),
    });
    if (res.ok) {
      const updatedTodo = await res.json();
      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4">Todo App</h1>
      <div className="flex mb-4 w-full max-w-md">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="flex-1 mr-2"
        />
        <Button onClick={addTodo}>Add</Button>
      </div>
      <div className="w-full max-w-md">
        <AnimatePresence>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onToggle={toggleTodo}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
