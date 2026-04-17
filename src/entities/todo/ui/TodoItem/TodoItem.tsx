import { memo, useContext, type ChangeEvent } from 'react'
import type { Task } from '@/shared/types/task'
import { TasksContext } from '@/entities/todo'
import RouterLink from '@/shared/ui/RouterLink'
import styles from './TodoItem.module.scss'

type TodoItemProps = Task & {
  className?: string
}

const TodoItem = ({ className = '', id, title, isDone }: TodoItemProps) => {
  const { firstIncompleteTaskRef, firstIncompleteTaskId, deleteTask, toggleTaskComplete, disappearingTaskId, appearingTaskId } =
    useContext(TasksContext) as any

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    toggleTaskComplete(id, event.target.checked)
  }

  return (
    <li
      className={`
        ${styles.todoItem}
        ${className}
        ${disappearingTaskId === id ? styles.isDisappearing : ''}
        ${appearingTaskId === id ? styles.isAppearing : ''}
      `}
      ref={id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
    >
      <input className={styles.checkbox} id={id} type="checkbox" checked={isDone} onChange={handleChange} />
      <label className={`${styles.label} visually-hidden`} htmlFor={id}>
        {title}
      </label>
      <RouterLink to={`tasks/${id}`} aria-label="Страница с подробной информацией о задаче">
        {title}
      </RouterLink>
      <button className={styles.deleteButton} aria-label="Delete" title="Delete" onClick={() => deleteTask(id)}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 5L5 15M5 5L15 15" stroke="#757575" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </li>
  )
}

export default memo(TodoItem)
