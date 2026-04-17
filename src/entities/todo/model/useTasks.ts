import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import tasksAPI from '@/shared/api/tasks'
import type { Task } from '@/shared/types/task'

type TasksAction =
  | { type: 'SET_ALL'; tasks: Task[] }
  | { type: 'ADD'; task: Task }
  | { type: 'TOGGLE_COMPLETE'; id: string; isDone: boolean }
  | { type: 'DELETE'; id: string }
  | { type: 'DELETE_ALL' }

const tasksReducer = (state: Task[], action: TasksAction): Task[] => {
  switch (action.type) {
    case 'SET_ALL':
      return Array.isArray(action.tasks) ? action.tasks : state
    case 'ADD':
      return [...state, action.task]
    case 'TOGGLE_COMPLETE':
      return state.map((task) => (task.id === action.id ? { ...task, isDone: action.isDone } : task))
    case 'DELETE':
      return state.filter((task) => task.id !== action.id)
    case 'DELETE_ALL':
      return []
    default:
      return state
  }
}

const useTasks = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, [])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [disappearingTaskId, setDisappearingTaskId] = useState<string | null>(null)
  const [appearingTaskId, setAppearingTaskId] = useState<string | null>(null)
  const newTaskInputRef = useRef<HTMLInputElement | null>(null)

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('Вы уверены что хотите удалить всё?')
    if (isConfirmed) {
      tasksAPI.deleteAll(tasks).then(() => dispatch({ type: 'DELETE_ALL' }))
    }
  }, [tasks])

  const deleteTask = useCallback((taskId: string) => {
    tasksAPI.delete(taskId).then(() => {
      setDisappearingTaskId(taskId)
      setTimeout(() => {
        dispatch({ type: 'DELETE', id: taskId })
        setDisappearingTaskId(null)
      }, 400)
    })
  }, [])

  const toggleTaskComplete = useCallback((taskId: string, isDone: boolean) => {
    tasksAPI.toggleComplete(taskId, isDone).then(() => {
      dispatch({ type: 'TOGGLE_COMPLETE', id: taskId, isDone })
    })
  }, [])

  const addTask = useCallback((title: string) => {
    const newTask = { title, isDone: false }
    tasksAPI.add(newTask).then((addedTask) => {
      dispatch({ type: 'ADD', task: addedTask })
      setNewTaskTitle('')
      setSearchQuery('')
      newTaskInputRef.current?.focus()
      setAppearingTaskId(addedTask.id)
      setTimeout(() => setAppearingTaskId(null), 400)
    })
  }, [])

  useEffect(() => {
    newTaskInputRef.current?.focus()
    tasksAPI.getAll().then((serverTasks) => {
      dispatch({ type: 'SET_ALL', tasks: serverTasks })
    })
  }, [])

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase()
    return clearSearchQuery.length > 0 ? tasks.filter(({ title }) => title.toLowerCase().includes(clearSearchQuery)) : null
  }, [searchQuery, tasks])

  return {
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
  }
}

export default useTasks
