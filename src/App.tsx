import { Suspense } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useApiStore } from './store/apiStore'
import { ApiDataDisplay } from './components/ApiDataDisplay'
import { useApiData } from './hooks/useApiData'

function App() {
  const { loading, error, hasData } = useApiStore()
  const { dataPromise, fetchUsers, clearError, reset } = useApiData()

  const handleFetchUsers = () => {
    fetchUsers()
  }

  const handleClearError = () => {
    clearError()
  }

  const handleReset = () => {
    reset()
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React 19 + Vite + Zustand + TypeScript</h1>
      
      <div className="card">
        <div className="button-group">
          <button 
            onClick={handleFetchUsers}
            disabled={loading}
            className="fetch-button"
          >
            {loading ? 'Loading...' : 'Fetch Users'}
          </button>
          
          {error && (
            <button onClick={handleClearError} className="clear-error-button">
              Clear Error
            </button>
          )}
          
          {hasData && (
            <button onClick={handleReset} className="reset-button">
              Reset
            </button>
          )}
        </div>
        
        <Suspense fallback={<div>Loading component...</div>}>
          <ApiDataDisplay dataPromise={dataPromise} />
        </Suspense>
      </div>
      
      <p className="read-the-docs">
        Click "Fetch Users" to load data from the API using React's "use" hook and Zustand store
      </p>
    </>
  )
}

export default App
