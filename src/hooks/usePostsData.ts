import { useApiStore } from '../store/simpleApiStore';

// Custom hook for traditional fetch + Zustand pattern
export const usePostsData = () => {
  const {
    posts,
    postsLoading,
    postsError,
    hasPostsData,
    fetchPosts,
    clearPostsError,
    resetPosts
  } = useApiStore();

  return {
    // Data from store
    posts,
    loading: postsLoading,
    error: postsError,
    hasData: hasPostsData,

    // Actions
    fetchPosts,
    clearError: clearPostsError,
    reset: resetPosts,
  };
};
