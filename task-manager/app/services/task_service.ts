import api from "../utils/api";
import { Task } from "../types/task";

// すべてのタスクを取得
export const fetchTasks = async (): Promise<Task[]> => {
  const response = await api.get<Task[]>("/tasks");
  return response.data;
};

// 新しいタスクを作成
export const createTask = async (title: string): Promise<Task> => {
  const response = await api.post<Task>("/tasks", { title, status: "Todo" });
  return response.data;
};


// タスクを1件取得
export const fetchTaskById = async (id: number): Promise<Task> => {
  const response = await api.get<Task>(`/tasks/${id}`);
  return response.data;
};

// タスクを更新
export const updateTask = async ({
  id,
  updatedData,
}: {
  id: number;
  updatedData: Partial<Task>;
}): Promise<Task> => {
  const response = await api.put<Task>(`/tasks/${id}`, updatedData);
  return response.data;
};

// タスクを削除
export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
