import type { Task } from '@/shared/types/task'

const useTasksLocalStorage = () => {
  const savedTasks = localStorage.getItem('tasks')

  const saveTasks = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  return {
    savedTasks: savedTasks ? (JSON.parse(savedTasks) as Task[]) : null,
    saveTasks,
  }
}

export default useTasksLocalStorage
