import { useEffect, useState } from 'react'
import tasksAPI from '@/shared/api/tasks'
import type { Task } from '@/shared/types/task'

type TaskPageProps = {
  params?: {
    id?: string
  }
}

const TaskPage = ({ params }: TaskPageProps) => {
  const taskId = params?.id ?? ''

  const [task, setTask] = useState<Task | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    tasksAPI
      .getById(taskId)
      .then((taskData) => {
        setTask(taskData)
        setHasError(false)
      })
      .catch(() => {
        setHasError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [taskId])

  if (isLoading) return <div>Загрузка...</div>
  if (hasError || !task) return <div>Задача не найдена!</div>

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.isDone ? 'Задача выполнена' : 'Задача не выполнена'}</p>
    </div>
  )
}

export default TaskPage
