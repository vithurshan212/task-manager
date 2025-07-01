import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './components/Home';
import CreateTask from './components/CreateTask';
import EditTask from './components/EditTask';
import Navbar from './components/Navbar';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => task.id === id ? { ...updatedTask, id } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home tasks={tasks} deleteTask={deleteTask} />} />
            <Route path="/create" element={<CreateTask addTask={addTask} />} />
            <Route path="/edit/:id" element={<EditTask tasks={tasks} updateTask={updateTask} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

