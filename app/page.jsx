// src/app/page.jsx

'use client';

import React, { useState, useEffect } from 'react';
import TodoItem from '@/components/TodoItem';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch todos from the backend
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/todos');
        if (!res.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await res.json();
        setTodos(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load todos');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTodo }),
      });

      if (!res.ok) {
        throw new Error('Failed to add todo');
      }

      const todo = await res.json();
      setTodos([todo, ...todos]);
      setNewTodo('');
    } catch (err) {
      console.error(err);
      setError('Failed to add todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });

      if (!res.ok) {
        throw new Error('Failed to delete todo');
      }

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete todo');
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (!res.ok) {
        throw new Error('Failed to toggle todo');
      }

      const updatedTodo = await res.json();
      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
    } catch (err) {
      console.error(err);
      setError('Failed to toggle todo');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6">Todo App</h1>

      <div className="flex mb-6 w-full max-w-md">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="flex-1 mr-2"
          onKeyDown={(e) => {
            if (e.key === 'Enter') addTodo();
          }}
        />
        <Button onClick={addTodo}>Add</Button>
      </div>

      {error && (
        <div className="mb-4 text-red-500">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-gray-500">Loading todos...</div>
      ) : (
        <ul className="w-full max-w-md">
          <AnimatePresence>
            {todos.length > 0 ? (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onDelete={deleteTodo}
                  onToggle={toggleTodo}
                />
              ))
            ) : (
              <motion.p
                className="text-center text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No todos yet!
              </motion.p>
            )}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
