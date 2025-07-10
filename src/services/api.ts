import type { User, Post } from '../types/api';

// Dummy API service
export const apiService = {
  async fetchUsers(): Promise<User[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate random success/error (80% success rate)
    if (Math.random() > 0.8) {
      throw new Error('Failed to fetch users from API');
    }

    // Mock API response similar to JSONPlaceholder
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1-770-736-8031',
        website: 'johndoe.org',
        company: {
          name: 'Doe Industries',
          catchPhrase: 'Multi-layered client-server neural-net',
        },
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '1-463-123-4447',
        website: 'janesmith.com',
        company: {
          name: 'Smith Solutions',
          catchPhrase: 'Proactive didactic contingency',
        },
      },
      {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob@example.com',
        phone: '1-477-935-8478',
        website: 'bobjohnson.net',
        company: {
          name: 'Johnson Corp',
          catchPhrase: 'Face to face bifurcated interface',
        },
      },
    ];

    return mockUsers;
  },

  async fetchPosts(): Promise<Post[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate random success/error (90% success rate)
    if (Math.random() > 0.9) {
      throw new Error('Failed to fetch posts from API');
    }

    // Mock API response for posts
    const mockPosts: Post[] = [
      {
        id: 1,
        title: 'Getting Started with React 19',
        body: 'React 19 introduces many exciting features including the new use hook that makes handling async operations much simpler.',
        userId: 1,
        tags: ['react', 'javascript', 'frontend'],
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: 'State Management with Zustand',
        body: 'Zustand provides a simple and efficient way to manage state in React applications without the boilerplate.',
        userId: 2,
        tags: ['zustand', 'state-management', 'react'],
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      },
      {
        id: 3,
        title: 'Building Modern Web Apps',
        body: 'Combining React 19, TypeScript, and Zustand creates a powerful stack for building modern web applications.',
        userId: 3,
        tags: ['react', 'typescript', 'web-development'],
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      },
      {
        id: 4,
        title: 'Async Data Fetching Patterns',
        body: 'Learn different patterns for fetching data in React applications, from traditional fetch to React.use.',
        userId: 1,
        tags: ['async', 'data-fetching', 'react'],
        createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      },
    ];

    return mockPosts;
  },
};

// Promise cache for React.use
let usersPromise: Promise<User[]> | null = null;

export const createUsersPromise = (): Promise<User[]> => {
  if (!usersPromise) {
    usersPromise = apiService.fetchUsers();
  }
  return usersPromise;
};

export const resetUsersPromise = () => {
  usersPromise = null;
};
