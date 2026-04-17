import { useRef } from 'react'
import type { Task } from '@/shared/types/task'

const useIncompleteTaskScroll = (tasks: Task[]) => {
  const firstIncompleteTaskRef = useRef<HTMLElement | null>(null)
  const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id

  return {
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
  }
}

export default useIncompleteTaskScroll
