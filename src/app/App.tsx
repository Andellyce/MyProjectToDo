import type { ComponentType } from 'react'
import Router from './routing/Router'
import TasksPage from '@/pages/TasksPage'
import TaskPage from '@/pages/TaskPage'
import './styles'

const App = () => {
  const routes: Record<string, ComponentType<{ params?: Record<string, string> }>> = {
    '/': TasksPage,
    '/tasks/:id': TaskPage,
    '*': () => <div>404 Страница не найдена</div>,
  }

  return <Router routes={routes} />
}

export default App
