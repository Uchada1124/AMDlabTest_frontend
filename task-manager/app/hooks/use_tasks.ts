import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTasks, createTask, updateTask, deleteTask, fetchTaskById} from "../services/task_service";

export const useTasks = () => {
  const queryClient = useQueryClient();

  // タスク一覧を取得
  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  // 新しいタスクを作成
  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      }),
  });

  // タスクを更新
  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      }),
  });

  // タスクを削除
  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      }),
  });


  return {
    tasksQuery,
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
  };
};

// タスク1件を取得
export const useTask = (id: number) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => fetchTaskById(id),
    enabled: !!id,
  });
};