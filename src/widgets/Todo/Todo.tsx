import { useContext } from 'react'
import TodoInfo from '@/features/stats'
import { TodoList, TasksContext } from '@/entities/todo'
import AddTaskForm from '@/features/add-task'
import SearchTaskForm from '@/features/search-task'
import Button from '@/shared/ui/Button'
import styles from './Todo.module.scss'

const Todo = () => {
  const { firstIncompleteTaskRef } = useContext(TasksContext) as any

  return (
    <div className={styles.todo}>
      <h1 className={styles.title}>Список дел</h1>
      <AddTaskForm styles={styles} />
      <SearchTaskForm styles={styles} />
      <TodoInfo styles={styles} />
      <Button onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({ behavior: 'smooth' })}>
        Показать первое незавершенное задание
      </Button>
      <TodoList styles={styles} />
    </div>
  )
}

export default Todo
