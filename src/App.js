import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the todos!', error);
      });
  }, []);

  const addTodo = todo => {
    axios.post('http://localhost:5000/api/todos', todo)
      .then(response => {
        setTodos([...todos, response.data]);
      })
      .catch(error => {
        console.error('There was an error creating the todo!', error);
      });
  };

  const toggleComplete = id => {
    const todo = todos.find(todo => todo._id === id);
    axios.patch(`http://localhost:5000/api/todos/${id}`, {
      completed: !todo.completed
    })
      .then(response => {
        setTodos(todos.map(todo => todo._id === id ? response.data : todo));
      })
      .catch(error => {
        console.error('There was an error updating the todo!', error);
      });
  };

  const deleteTodo = id => {
    console.log('deleteTodo', id);
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => {
        console.log('deleteTodo success', id);
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(error => {
        console.log('deleteTodo error', id);
        console.error('There was an error deleting the todo!', error);
      });
  };

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
    </div>
  );
};

export default App;
