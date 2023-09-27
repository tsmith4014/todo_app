import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then(response => response.json())
      .then(data => {
        setQuote(data);
      })
      .catch(error => console.log("Error fetching quote:", error));
  }, []);
  
  return (
    <div className="App">
      <h1>Wacky To-Do List!</h1>
      {quote && (
        <div className="quote-container">
          <blockquote>"{quote.content}"</blockquote>
          <cite>- {quote.author}</cite>
        </div>
      )}
      <TodoList />
    </div>
  );
}

function TodoList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (tasks.length % 5 === 0 && tasks.length > 0) {
      // Make every task element shake!
      const listItems = document.querySelectorAll('li');
      listItems.forEach(item => {
        item.animate([
          // keyframes
          { transform: 'translateX(0px)' },
          { transform: 'translateX(10px)' },
          { transform: 'translateX(-10px)' },
          { transform: 'translateX(0px)' }
        ], {
          // timing options
          duration: 100,
          iterations: 5
        });
      });
    }
  }, [tasks]);

  const addTask = (taskContent) => {
    const newTask = {
      id: Date.now(),
      content: taskContent
    };
    setTasks([...tasks, newTask]);
  };
  
  const removeTask = (idToRemove) => {
    const taskElement = document.getElementById(idToRemove);
    taskElement.style.opacity = "0";
    setTimeout(() => {
      setTasks(tasks.filter((task) => task.id !== idToRemove));
    }, 500);
  };

  return (
    <div>
      <NewTaskInput addTask={addTask} />
      <TaskList tasks={tasks} removeTask={removeTask} />
    </div>
  );
}

function NewTaskInput({ addTask }) {
  const [newTask, setNewTask] = useState('');

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleNewTaskSubmit = (e) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask('');
  };

  return (
    <form onSubmit={handleNewTaskSubmit}>
      <input
        type="text"
        value={newTask}
        onChange={handleNewTaskChange}
        placeholder="Add a wacky task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

function TaskList({ tasks, removeTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} id={task.id} onClick={() => removeTask(task.id)}>
          {task.content}
        </li>
      ))}
    </ul>
  );
}

export default App;