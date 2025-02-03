import { HomePage } from '@pages/home'
import { NotFoundPage } from '@pages/not-found'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: '',
    element: <HomePage />,
  },
])
