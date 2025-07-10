import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { User, Post } from '../types/api';

interface ApiState {
  // Users data (React.use)
  users: User[];
  loading: boolean;
  error: string | null;
  hasData: boolean;

  // Posts data (traditional fetch)
  posts: Post[];
  postsLoading: boolean;
  postsError: string | null;
  hasPostsData: boolean;
}

interface ApiActions {
  // User actions
  setUsers: (users: User[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;

  // Post actions
  setPosts: (posts: Post[]) => void;
  setPostsLoading: (loading: boolean) => void;
  setPostsError: (error: string | null) => void;
  clearPostsError: () => void;
  resetPosts: () => void;
  fetchPosts: () => Promise<void>;
}

type ApiStore = ApiState & ApiActions;

const initialState: ApiState = {
  // Users state
  users: [],
  loading: false,
  error: null,
  hasData: false,

  // Posts state
  posts: [],
  postsLoading: false,
  postsError: null,
  hasPostsData: false,
};

export const useApiStore = create<ApiStore>()(
  devtools(
    (set, get) => ({
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

      reset: () => set({
        users: [],
        loading: false,
        error: null,
        hasData: false
      }),

      setPosts: (posts) => set({
        posts,
        hasPostsData: posts.length > 0,
        postsLoading: false
      }),

      setPostsLoading: (loading) => set({ postsLoading: loading }),

      setPostsError: (error) => set({
        postsError: error,
        postsLoading: false
      }),

      clearPostsError: () => set({ postsError: null }),

      resetPosts: () => set({
        posts: [],
        postsLoading: false,
        postsError: null,
        hasPostsData: false
      }),

      // Fetch posts using traditional fetch
      fetchPosts: async () => {
        const { setPostsLoading, setPostsError, setPosts } = get();

        try {
          setPostsLoading(true);
          setPostsError(null);

          // Import apiService dynamically to avoid circular dependencies
          const { apiService } = await import('../services/api');
          const posts = await apiService.fetchPosts();

          setPosts(posts);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to fetch posts';
          setPostsError(errorMessage);
        }
      },
    }),
    { name: 'api-store' }
  )
);
