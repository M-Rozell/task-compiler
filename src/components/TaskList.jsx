
import React, { useState, useEffect } from 'react'
import TaskForm from './TaskForm'
import Tasks from './Tasks';

const LOCAL_STORAGE_KEY = 'taskApp.tasks'

function TaskList() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []);

  //load tasks, only want to call this once. when the page loads and DOES NOT WORK!!!
  //INSTEAD DO ABOVE WITH USESTATE B/C (When you reload the app/component both effects will run, and React state updates are processed asynchronously, so it's picking up the empty array state persisted to localStorage before the state update is processed. Just read from localStorage directly when setting the initial todoList state value.)
  // useEffect(()=> {
  //   const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))//json.parse converts it to an array so map function in tasks.jsx works
  //   if (storedTasks) {
  //     setTasks(storedTasks)
  //   }
  // }, [])

  //store Tasks
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = task => {
    if (!task.text || /^\s*$/.test(task.text)) { //pulled from stackOverflow...uses RegExp test method to test whether a string val is empty or only contains spaces. The test() method executes a search for a match between a regular expression and a specified string. Returns true or false.
      return
    }
    const newTasks = [task, ...tasks] //...tasks utilizes the spread operator. takes in an iterable(array) and expands it into individual elements.
    setTasks(newTasks);
    console.log(newTasks);
  };

  const updateTask = (taskId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return
    }
    setTasks(prev => prev.map(item => (item.id === taskId ? newValue : item)));
  };

  const removeTask = id => {
    const removeArr = [...tasks].filter(task => task.id !== id)
    setTasks(removeArr)
  };

  const completeTask = id => {
    let updatedTasks = tasks.map(task => {
      if (task.id === id) {
        task.isComplete = !task.isComplete //toggling b/w true and false
      }
      return task
    })
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1 className='taskCompiler'>Task Compiler</h1>
      <hr className='horizontalLine' />
      <TaskForm onSubmit={addTask} />
      <Tasks
        tasks={tasks}
        completeTask={completeTask}
        removeTask={removeTask}
        updateTask={updateTask} />

    </div>
  );
};

export default TaskList;


