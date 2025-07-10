import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { User } from '../types/api';
import { apiService } from '../services/api';

// Store state interface
interface ApiState {
  users: User[];
  loading: boolean;
  error: string | null;
  hasData: boolean;
}

// Store actions interface
interface ApiActions {
  fetchUsers: () => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

// Combined store type
type ApiStore = ApiState & ApiActions;

// Initial state
const initialState: ApiState = {
  users: [],
  loading: false,
  error: null,
  hasData: false,
};

// Create store with middleware
export const useApiStore = create<ApiStore>()(
  devtools(
    subscribeWithSelector(
      immer((set) => ({
        ...initialState,
        
        // Fetch users action
        fetchUsers: async () => {
          set((state) => {
            state.loading = true;
            state.error = null;
          });
          
          try {
            const users = await apiService.fetchUsers();
            set((state) => {
              state.users = users;
              state.loading = false;
              state.hasData = true;
            });
          } catch (error) {
            set((state) => {
              state.error = error instanceof Error ? error.message : 'An unknown error occurred';
              state.loading = false;
              state.hasData = false;
            });
          }
        },
        
        // Clear error action
        clearError: () => {
          set((state) => {
            state.error = null;
          });
        },
        
        // Reset store action
        reset: () => {
          set(() => initialState);
        },
      }))
    ),
    { name: 'api-store' }
  )
);

// Selectors for better performance
export const useUsers = () => useApiStore((state) => state.users);
export const useLoading = () => useApiStore((state) => state.loading);
export const useError = () => useApiStore((state) => state.error);
export const useHasData = () => useApiStore((state) => state.hasData);
export const useApiActions = () => useApiStore((state) => ({
  fetchUsers: state.fetchUsers,
  clearError: state.clearError,
  reset: state.reset,
}));
