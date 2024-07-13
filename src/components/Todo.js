import React from 'react';

const Todo = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div
        style={{
          textDecoration: todo.completed ? 'line-through' : '',
        }}
        onClick={() => toggleComplete(todo._id)}
      >
        {todo.title}
      </div>
      <button onClick={() => deleteTodo(todo._id)}>Delete</button>
    </div>
  );
};

export default Todo;
