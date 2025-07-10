import { useApiStore } from '../store/apiStore';
import type { User } from '../types/api';

// Hook that creates a promise for the use hook
export const useApiData = () => {
  const { users, loading, error, hasData, fetchUsers } = useApiStore();
  
  // Create a promise that resolves to the current state
  const createDataPromise = (): Promise<{
    users: User[];
    loading: boolean;
    error: string | null;
    hasData: boolean;
  }> => {
    return new Promise((resolve) => {
      // Resolve immediately with current state
      resolve({ users, loading, error, hasData });
    });
  };
  
  return {
    dataPromise: createDataPromise(),
    fetchUsers,
    clearError: useApiStore.getState().clearError,
    reset: useApiStore.getState().reset,
  };
};
