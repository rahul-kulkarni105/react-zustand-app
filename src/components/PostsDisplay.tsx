import type { Post } from '../types/api';

interface PostsDisplayProps {
  posts: Post[];
  loading: boolean;
  error: string | null;
  hasData: boolean;
}

export const PostsDisplay = ({
  posts,
  loading,
  error,
  hasData,
}: PostsDisplayProps) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>❌ Error Loading Posts</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="no-data-container">
        <p>No posts data available</p>
        <small>Click "Fetch Posts" to load posts</small>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <h3>📝 Posts Data from Zustand Store (Traditional Fetch)</h3>
      <div className="posts-grid">
        {posts.map(post => (
          <article key={post.id} className="post-card">
            <h4>{post.title}</h4>
            <p className="post-body">{post.body}</p>
            <div className="post-meta">
              <div className="post-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
              <small className="post-date">
                {new Date(post.createdAt).toLocaleDateString()}
              </small>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
