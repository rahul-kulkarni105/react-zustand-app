import { Suspense, Component } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useApiData } from './hooks/useApiData';
import { usePostsData } from './hooks/usePostsData';
import { PostsDisplay } from './components/PostsDisplay';
import type { User } from './types/api';

// Simple Error Boundary
class ErrorBoundary extends Component<
  { children: React.ReactNode; onError: (error: string) => void },
  { hasError: boolean }
> {
  constructor(props: {
    children: React.ReactNode;
    onError: (error: string) => void;
  }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.log('❌ Error caught by ErrorBoundary:', error.message);
    this.props.onError(error.message);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

// Simple component to display data
const DataDisplay = ({
  users,
  loading,
  error,
  hasData,
}: {
  users: User[];
  loading: boolean;
  error: string | null;
  hasData: boolean;
}) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>❌ Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="no-data-container">
        <p>No users data available</p>
        <small>Click "Fetch Users" to load data</small>
      </div>
    );
  }

  return (
    <div className="users-container">
      <h3>✅ Users Data from Zustand Store</h3>
      <div className="users-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <h4>{user.name}</h4>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Website:</strong> {user.website}
            </p>
            <div className="company-info">
              <p>
                <strong>Company:</strong> {user.company.name}
              </p>
              <p>
                <em>"{user.company.catchPhrase}"</em>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const {
    users,
    loading,
    error,
    hasData,
    fetchUsers,
    clearError,
    reset,
    ApiDataHandler,
    isFetching,
  } = useApiData();

  const {
    posts,
    loading: postsLoading,
    error: postsError,
    hasData: hasPostsData,
    fetchPosts,
    clearError: clearPostsError,
    reset: resetPosts,
  } = usePostsData();

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
            onClick={fetchUsers}
            disabled={loading || isFetching}
            className="fetch-button"
          >
            {loading || isFetching ? 'Loading...' : 'Fetch Users'}
          </button>

          {error && (
            <button onClick={clearError} className="clear-error-button">
              Clear Error
            </button>
          )}

          {hasData && (
            <button onClick={reset} className="reset-button">
              Reset
            </button>
          )}
        </div>

        {/* React.use handler with Suspense */}
        <ErrorBoundary onError={clearError}>
          <Suspense
            fallback={
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading via React.use...</p>
              </div>
            }
          >
            <ApiDataHandler />
          </Suspense>
        </ErrorBoundary>

        {/* Display data from Zustand store */}
        <DataDisplay
          users={users}
          loading={loading}
          error={error}
          hasData={hasData}
        />
      </div>

      {/* Posts Section - Traditional Fetch */}
      <div className="card">
        <h2>📝 Posts Section (Traditional Fetch + Zustand)</h2>

        <div className="button-group">
          <button
            onClick={fetchPosts}
            disabled={postsLoading}
            className="fetch-button"
          >
            {postsLoading ? 'Loading...' : 'Fetch Posts'}
          </button>

          {postsError && (
            <button onClick={clearPostsError} className="clear-error-button">
              Clear Error
            </button>
          )}

          {hasPostsData && (
            <button onClick={resetPosts} className="reset-button">
              Reset Posts
            </button>
          )}
        </div>

        {/* Display posts from Zustand store */}
        <PostsDisplay
          posts={posts}
          loading={postsLoading}
          error={postsError}
          hasData={hasPostsData}
        />
      </div>

      <p className="read-the-docs">
        Two patterns: React.use + Zustand (Users) vs Traditional Fetch + Zustand
        (Posts)
      </p>
    </>
  );
}

export default App;
