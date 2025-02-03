import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import './index.css'
import { SharedService } from './shared'

SharedService.Stores.useAuthStore.getState().setupTokens()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
