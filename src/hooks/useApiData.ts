import { use, useEffect, useState } from 'react';
import { useApiStore } from '../store/simpleApiStore';
import { apiService } from '../services/api';
import type { User } from '../types/api';

// Custom hook that combines React.use with Zustand
export const useApiData = () => {
  const { users, loading, error, hasData, setUsers, setLoading, setError, clearError, reset } = useApiStore();
  const [apiPromise, setApiPromise] = useState<Promise<User[]> | null>(null);

  // Function to trigger fetch
  const fetchUsers = () => {
    setLoading(true);
    setError(null);
    const promise = apiService.fetchUsers();
    setApiPromise(promise);
  };

  // Component that uses React.use to handle the promise
  const ApiDataHandler = () => {
    // Early return check should be after all hooks
    const fetchedUsers = apiPromise ? use(apiPromise) : null;

    // Always call useEffect at the top level to avoid conditional hooks
    useEffect(() => {
      if (!fetchedUsers) return;

      console.log('✅ Data fetched via React.use, saving to Zustand store:', fetchedUsers);
      setUsers(fetchedUsers);
      setApiPromise(null); // Reset promise
    }, [fetchedUsers]);

    return null;
  };

  return {
    // Data from store
    users,
    loading,
    error,
    hasData,

    // Actions
    fetchUsers,
    clearError,
    reset,

    // Component for handling React.use
    ApiDataHandler,

    // Flag to show if we're fetching
    isFetching: apiPromise !== null,
  };
};
