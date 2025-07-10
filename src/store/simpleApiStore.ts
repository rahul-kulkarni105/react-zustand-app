import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { User } from '../types/api';

interface ApiState {
  users: User[];
  loading: boolean;
  error: string | null;
  hasData: boolean;
}

interface ApiActions {
  setUsers: (users: User[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;
}

type ApiStore = ApiState & ApiActions;

const initialState: ApiState = {
  users: [],
  loading: false,
  error: null,
  hasData: false,
};

export const useApiStore = create<ApiStore>()(
  devtools(
    (set) => ({
      ...initialState,

      setUsers: (users) => set({
        users,
        hasData: users.length > 0,
        loading: false
      }),

      setLoading: (loading) => set({ loading }),

      setError: (error) => set({
        error,
        loading: false
      }),

      clearError: () => set({ error: null }),

      reset: () => set(initialState),
    }),
    { name: 'api-store' }
  )
);
