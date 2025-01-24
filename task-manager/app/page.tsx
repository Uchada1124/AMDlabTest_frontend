"use client";

import { useState } from "react";
import { useTasks, useTask } from "./hooks/use_tasks";

export default function Home() {
  const { tasksQuery, createTask, updateTask, deleteTask } = useTasks();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  // タスク1件の詳細を取得
  const { data: selectedTask, isLoading: isTaskLoading } = useTask(selectedTaskId || 0);

  // 新しいタスクを作成
  const handleCreateTask = () => {
    if (newTaskTitle.trim()) {
      createTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  // タスクのタイトルを更新
  const handleUpdateTask = (id: number, title: string) => {
    updateTask({ id, updatedData: { title } });
  };

  // タスクの削除
  const handleDeleteTask = (id: number) => {
    deleteTask(id);
  };

  return (
    <div>
      <h1>Task Manager</h1>

      {/* 新しいタスクを作成 */}
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter task title"
        />
        <button onClick={handleCreateTask}>Add Task</button>
      </div>

      {/* タスク一覧 */}
      <h2>Task List</h2>
      {tasksQuery.isLoading ? (
        <p>Loading tasks...</p>
      ) : tasksQuery.isError ? (
        <p>Error loading tasks</p>
      ) : (
        <ul>
          {tasksQuery.data?.map((task) => (
            <li key={task.id}>
              <input
                type="text"
                value={task.title}
                onChange={(e) => handleUpdateTask(task.id, e.target.value)}
              />
              <select
                value={task.status}
                onChange={(e) =>
                  updateTask({
                    id: task.id,
                    updatedData: { status: e.target.value as "Todo" | "Progress" | "Done" },
                  })
                }
              >
                <option value="Todo">Todo</option>
                <option value="Progress">Progress</option>
                <option value="Done">Done</option>
              </select>

              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              <button onClick={() => setSelectedTaskId(task.id)}>View Details</button>
            </li>
          ))}
        </ul>
      )}

      {/* タスク詳細 */}
      {selectedTaskId && (
        <div>
          <h2>Task Details</h2>
          {isTaskLoading ? (
            <p>Loading task details...</p>
          ) : selectedTask ? (
            <div>
              <p><strong>Title:</strong> {selectedTask.title}</p>
              <p><strong>Status:</strong> {selectedTask.status}</p>
            </div>
          ) : (
            <p>Task not found</p>
          )}
        </div>
      )}
    </div>
  );
}
