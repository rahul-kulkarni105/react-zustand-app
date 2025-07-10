import { use } from 'react';
import type { User } from '../types/api';

interface ApiDataDisplayProps {
  dataPromise: Promise<{
    users: User[];
    loading: boolean;
    error: string | null;
    hasData: boolean;
  }>;
}

export const ApiDataDisplay: React.FC<ApiDataDisplayProps> = ({ dataPromise }) => {
  const { users, loading, error, hasData } = use(dataPromise);
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading users...</p>
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
  
  if (!hasData || users.length === 0) {
    return (
      <div className="no-data-container">
        <p>No users data available</p>
      </div>
    );
  }
  
  return (
    <div className="users-container">
      <h3>✅ Users Data</h3>
      <div className="users-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h4>{user.name}</h4>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> {user.website}</p>
            <div className="company-info">
              <p><strong>Company:</strong> {user.company.name}</p>
              <p><em>"{user.company.catchPhrase}"</em></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
