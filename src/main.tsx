import '@shared/lib/styles/global.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import { SharedService } from './shared'

SharedService.Stores.useAuthStore.getState().setupTokens()
SharedService.Stores.useAuthStore
  .getState()
  .setIsAuth(SharedService.Stores.useAuthStore.getState().checkIsAuth())

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
