import type { User } from '../types/api';

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
