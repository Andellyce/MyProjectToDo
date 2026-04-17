import { memo, useContext, useMemo } from 'react'
import type { StylesMap } from '@/shared/types/ui'
import type { Task } from '@/shared/types/task'
import { TasksContext } from '@/entities/todo'

type TodoInfoProps = {
  styles: StylesMap
}

const TodoInfo = ({ styles }: TodoInfoProps) => {
  const { tasks, deleteAllTasks } = useContext(TasksContext) as {
    tasks: Task[]
    deleteAllTasks: () => void
  }

  const total = tasks.length
  const hasTasks = total > 0
  const done = useMemo(() => tasks.filter(({ isDone }) => isDone).length, [tasks])

  return (
    <div className={styles.info}>
      <div className={styles.totalTasks}>Сделано {done} из {total}</div>
      {hasTasks && (
        <button className={styles.deleteAllButton} type="button" onClick={deleteAllTasks}>
          Удалить всё
        </button>
      )}
    </div>
  )
}

export default memo(TodoInfo)
