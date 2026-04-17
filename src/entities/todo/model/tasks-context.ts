import { createContext, type Dispatch, type RefObject, type SetStateAction } from 'react'
import type { Task } from '@/shared/types/task'

export type TasksContextValue = {
  tasks: Task[]
  filteredTasks: Task[] | null
  deleteTask: (taskId: string) => void
  deleteAllTasks: () => void
  toggleTaskComplete: (taskId: string, isDone: boolean) => void
  newTaskTitle: string
  setNewTaskTitle: Dispatch<SetStateAction<string>>
  searchQuery: string
  setSearchQuery: Dispatch<SetStateAction<string>>
  newTaskInputRef: RefObject<HTMLInputElement | null>
  addTask: (title: string) => void
  disappearingTaskId: string | null
  appearingTaskId: string | null
  firstIncompleteTaskRef: RefObject<HTMLElement | null>
  firstIncompleteTaskId?: string
}

export const TasksContext = createContext<TasksContextValue>({} as TasksContextValue)
