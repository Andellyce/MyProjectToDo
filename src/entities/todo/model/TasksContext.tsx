import { useMemo, type PropsWithChildren } from 'react'
import useTasks from './useTasks'
import useIncompleteTaskScroll from './useIncompleteTaskScroll'
import { TasksContext } from './tasks-context'

export const TasksProvider = ({ children }: PropsWithChildren) => {
  const {
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    disappearingTaskId,
    appearingTaskId,
  } = useTasks()

  const { firstIncompleteTaskRef, firstIncompleteTaskId } = useIncompleteTaskScroll(tasks)

  const value = useMemo(
    () => ({
      tasks,
      filteredTasks,
      deleteTask,
      deleteAllTasks,
      toggleTaskComplete,
      newTaskTitle,
      setNewTaskTitle,
      searchQuery,
      setSearchQuery,
      newTaskInputRef,
      addTask,
      disappearingTaskId,
      appearingTaskId,
      firstIncompleteTaskRef,
      firstIncompleteTaskId,
    }),
    [
      tasks,
      filteredTasks,
      deleteTask,
      deleteAllTasks,
      toggleTaskComplete,
      newTaskTitle,
      setNewTaskTitle,
      searchQuery,
      setSearchQuery,
      newTaskInputRef,
      addTask,
      disappearingTaskId,
      appearingTaskId,
      firstIncompleteTaskRef,
      firstIncompleteTaskId,
    ],
  )

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}
