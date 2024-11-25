import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { motion } from 'framer-motion';

const TodoItem = ({ todo, onDelete, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      layout
      className="flex items-center justify-between p-4 bg-white rounded shadow mb-2"
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mr-2 form-checkbox h-5 w-5 text-blue-600"
        />
        <span className={todo.completed ? 'line-through text-gray-500' : ''}>
          {todo.title}
        </span>
      </div>
      <Button onClick={() => onDelete(todo.id)} className="bg-red-500 hover:bg-red-600">
        Delete
      </Button>
    </motion.div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default TodoItem;
