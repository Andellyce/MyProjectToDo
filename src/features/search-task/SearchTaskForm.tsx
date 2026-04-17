import { useContext, type FormEventHandler } from 'react'
import type { StylesMap } from '@/shared/types/ui'
import Field from '@/shared/ui/Field'
import { TasksContext } from '@/entities/todo'

type SearchTaskFormProps = {
  styles: StylesMap
}

const SearchTaskForm = ({ styles }: SearchTaskFormProps) => {
  const { searchQuery, setSearchQuery } = useContext(TasksContext) as any

  const onInput: FormEventHandler<HTMLInputElement> = (event) => {
    setSearchQuery(event.currentTarget.value)
  }

  return (
    <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <Field className={styles.field} label="Найти задачу" id="search-task" type="search" value={searchQuery} onInput={onInput} />
    </form>
  )
}

export default SearchTaskForm
