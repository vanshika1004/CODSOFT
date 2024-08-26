import React, { useState } from 'react';
import './Todo.css'

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null); // Track the task being edited
  const [editedTask, setEditedTask] = useState(''); // Store the edited task text

  const addTask = () => {
    if (newTask !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]); // Add completed property
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEdit = (index) => {
    setEditingTask(index);
    setEditedTask(tasks[index].text); // Set the edited task text to the original task text
  };

  const handleSave = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, text: editedTask }; // Update the task text with the edited text
      }
      return task;
    });
    setTasks(updatedTasks);
    setEditingTask(null);
    setEditedTask(''); // Reset the edited task text
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed }; // Toggle the completed status
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className='bg-[#F7EFE5] w-11/12 max-w-md place-self-center flex flex-col p-7 min-h-[550px] gap-3 shadow-lg rounded-md'>
      {/* title */}
      <h2 className='text-3xl'>TASK TRACKER APP</h2>
      {/* input-box */}
      <div className='flex my-4 bg-gray-400 py-3 rounded-sm px-2'>
        <input
          className='bg-transparent border-0 outline-none flex-1 pl-5 pr-2 placeholder:text-red-500'
          type='text'
          placeholder='Enter your task'
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
        />
        <button onClick={addTask}>
        <span class="transition"></span>
        <span class="gradient"></span>
        <span class="label">ADD</span>
        </button>
      </div>

      <ul className='flex flex-col gap-4'>
        {tasks.map((task, index) => (
          <li key={index}>
            <div className='flex '>
              <div className='bg-blue-300 text-black flex-1 rounded-md p-3 flex justify-between items-center'>
                <div className='flex-col gap-1 items-center'>
                  <input
                    type='checkbox'
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(index)}
                  />
                  {editingTask === index ? (
                    <input
                      type='text'
                      value={editedTask}
                      onChange={(e) => {
                        setEditedTask(e.target.value);
                      }}
                      className='ml-2'
                    />
                  ) : (
                    <span className='ml-2'>{task.text}</span>
                  )}

                  <div>
                  {task.completed && (
                    <span className='text-green-500 font-bold'>Completed</span>
                  )}
                  </div>
                </div>
                <div className='flex gap-2'>
                  {editingTask === index ? (
                    <button
                      className='bg-[#AD49E1] p-2 rounded-md'
                      onClick={() => handleSave(index)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className='bg-[#AD49E1] p-2 rounded-md'
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className='bg-orange-400 p-2 rounded-md'
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
