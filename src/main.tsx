import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { AuthProvider } from './supabase/AuthContext.tsx';
import AuthGate from './supabase/AuthGate.tsx';
import Login from './login/Login.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Theme appearance='dark' style={{ height: '100vh', width: '100vw', margin: 0, padding: 0 }}>
        <AuthGate LoggedInComponent={App} LoginComponent={Login} />
      </Theme>
    </AuthProvider>
  </StrictMode>,
)
