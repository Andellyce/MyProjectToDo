import type { Task, TaskDraft } from '@/shared/types/task'

const URL = 'http://localhost:3001/tasks'

const headers = {
  'Content-Type': 'application/json',
}

const serverAPI = {
  getAll: (): Promise<Task[]> => fetch(URL).then((response) => response.json()),

  getById: (id: string): Promise<Task> => fetch(`${URL}/${id}`).then((response) => response.json()),

  add: (task: TaskDraft): Promise<Task> =>
    fetch(URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(task),
    }).then((response) => response.json()),

  delete: (id: string) => fetch(`${URL}/${id}`, { method: 'DELETE' }),

  deleteAll: (tasks: Task[]) => Promise.all(tasks.map(({ id }) => serverAPI.delete(id))),

  toggleComplete: (id: string, isDone: boolean) =>
    fetch(`${URL}/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ isDone }),
    }),
}

export default serverAPI
