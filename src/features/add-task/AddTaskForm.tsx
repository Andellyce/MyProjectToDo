import { useContext, useState, type FormEvent, type FormEventHandler } from 'react'
import type { StylesMap } from '@/shared/types/ui'
import Field from '@/shared/ui/Field'
import Button from '@/shared/ui/Button'
import { TasksContext } from '@/entities/todo'

type AddTaskFormProps = {
  styles: StylesMap
}

const AddTaskForm = ({ styles }: AddTaskFormProps) => {
  const { addTask, newTaskTitle, setNewTaskTitle, newTaskInputRef } = useContext(TasksContext) as any
  const [error, setError] = useState('')

  const clearNewTaskTitle = newTaskTitle.trim()
  const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isNewTaskTitleEmpty) addTask(clearNewTaskTitle)
  }

  const onInput: FormEventHandler<HTMLInputElement> = (event) => {
    const value = event.currentTarget.value
    const clearValue = value.trim()
    const hasOnlySpaces = value.length > 0 && clearValue.length === 0

    setNewTaskTitle(value)
    setError(hasOnlySpaces ? 'Задача не может быть пустой' : '')
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Field
        className={styles.field}
        label="Новая задача"
        id="new-task"
        value={newTaskTitle}
        error={error}
        onInput={onInput}
        ref={newTaskInputRef}
      />
      <Button type="submit" isDisabled={isNewTaskTitleEmpty}>
        Добавить
      </Button>
    </form>
  )
}

export default AddTaskForm
