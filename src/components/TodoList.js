import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, toggleComplete, deleteTodo }) => {
  return (
    <div>
      {todos.map(todo => (
        <Todo
          key={todo._id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
