import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import CoreProviders from './apps/core/di/coreproviders.ts'
import { BrowserRouter } from 'react-router-dom'
import AuthProviders from './apps/auth/di/authProviders.ts'

//Initialization 
CoreProviders.provideFirebaseApp();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
	<BrowserRouter>
	    <App />
	</BrowserRouter>
  </React.StrictMode>,
)
