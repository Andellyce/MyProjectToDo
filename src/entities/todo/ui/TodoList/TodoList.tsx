import { memo, useContext } from 'react'
import type { StylesMap } from '@/shared/types/ui'
import type { Task } from '@/shared/types/task'
import { TodoItem, TasksContext } from '@/entities/todo'

type TodoListProps = {
  styles: StylesMap
}

const TodoList = ({ styles }: TodoListProps) => {
  const { tasks, filteredTasks } = useContext(TasksContext) as {
    tasks: Task[]
    filteredTasks: Task[] | null
  }

  const hasTasks = tasks.length > 0
  const isEmptyFilteredTasks = filteredTasks?.length === 0

  if (!hasTasks) return <div className={styles.emptyMessage}>Задач пока нет</div>
  if (hasTasks && isEmptyFilteredTasks) return <div className={styles.emptyMessage}>Задачи не найдены</div>

  return (
    <ul className={styles.list}>
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem className={styles.item} key={task.id} {...task} />
      ))}
    </ul>
  )
}

export default memo(TodoList)
