//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/auth_context.tsx'
import { GaAccountsProvider } from './context/ga_accounts_context.tsx'
import { GaDataProvider } from './context/ga_data_context.tsx'

createRoot(document.getElementById('root')!).render(
 // <StrictMode>
  <AuthProvider>
    <GaAccountsProvider>
      <GaDataProvider>
        <App />
      </GaDataProvider>
    </GaAccountsProvider>
  </AuthProvider>
  //</StrictMode>,
)
