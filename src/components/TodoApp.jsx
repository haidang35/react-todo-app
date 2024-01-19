import React, { useState } from "react";
import Task from "./Task";

export const STATUS = {
  DONE: 1,
  PENDING: 0,
};

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskIndex, setEditTaskIndex] = useState(-1);

  const handleChangeNewTask = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddNewTask = () => {
    if (!newTask) {
      setError("Task cannot be empty!");
      return;
    }

    setError("");

    setNewTask("");

    setTasks((prevTasks) => [
      ...prevTasks,
      {
        name: newTask,
        status: STATUS.PENDING,
      },
    ]);
  };

  const handleUpdateTask = () => {
    if (!newTask) {
      setError("Task cannot be empty!");
      return;
    }

    setError("");

    setNewTask("");

    setTasks((prevTasks) =>
      prevTasks.map((task, i) => {
        if (i === editTaskIndex) {
          task.name = newTask;
        }
        return task;
      })
    );

    setIsEditing(false);
  };

  const handleCheckTask = (e, taskIndex) => {
    let status = STATUS.PENDING;

    if (e.target.checked) {
      status = STATUS.DONE;
    }

    setTasks((prevTasks) =>
      prevTasks.map((task, i) => {
        if (i === taskIndex) {
          task.status = status;
        }
        return task;
      })
    );
  };

  const handleRemoveTask = (taskIndex) => {
    setTasks((prevTasks) => prevTasks.filter((task, i) => i !== taskIndex));
  };

  const handleEditTask = (taskIndex) => {
    setIsEditing(true);

    setEditTaskIndex(taskIndex);

    const selectedTask = tasks.find((task, i) => i === taskIndex);

    setNewTask(selectedTask?.name);
  };

  return (
    <div className="todo-app">
      <div className="todo-box">
        <h1 className="title">Todo List</h1>
        <div className="create-box">
          <input
            type="text"
            value={newTask}
            onChange={handleChangeNewTask}
            name="name"
            placeholder="Add your task"
          />
          {isEditing ? (
            <button onClick={handleUpdateTask} className="btn-add-task">
              🗸
            </button>
          ) : (
            <button onClick={handleAddNewTask} className="btn-add-task">
              +
            </button>
          )}
        </div>
        <div className="error">{error}</div>
        {tasks.length === 0 && (
          <div className="empty">
            Your list is empty! <br />
            Add a new task above to get started.
          </div>
        )}
        <div className="todo-list">
          {tasks.map((task, index) => (
            <Task
              key={index}
              data={task}
              onChecked={(e) => handleCheckTask(e, index)}
              onRemove={() => handleRemoveTask(index)}
              onEdit={() => handleEditTask(index)}
            />
          ))}
        </div>
      </div>
      <div className="copyright">
        Xem hướng dẫn chi tiết tại {" "}
        <a target="_blank" href="https://www.youtube.com/@dangjinner.official">
          Dang Jinner
        </a>
      </div>
    </div>
  );
}
