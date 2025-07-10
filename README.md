# React 19 + Vite + TypeScript + Zustand App

A modern React application demonstrating the integration of React 19's `use` hook with Zustand state management for API data fetching.

## Features

- **React 19**: Latest React version with the new `use` hook
- **Vite**: Fast development server and build tool
- **TypeScript**: Type-safe development
- **Zustand**: Lightweight state management with best practices
- **API Integration**: Dummy API with loading, success, and error states
- **Modern UI**: Clean and responsive design

## Tech Stack

- React 19.1.0
- Vite 7.0.3
- TypeScript 5.8.3
- Zustand (latest)
- Immer (for immutable state updates)

## Project Structure

```
src/
├── components/
│   └── ApiDataDisplay.tsx    # Component using React's "use" hook
├── hooks/
│   └── useApiData.ts         # Custom hook for API data management
├── services/
│   └── api.ts                # API service with dummy data
├── store/
│   └── apiStore.ts           # Zustand store with best practices
├── types/
│   └── api.ts                # TypeScript types
├── App.tsx                   # Main application component
└── main.tsx                  # Application entry point
```

## Key Implementation Details

### Zustand Store Features
- **Middleware**: Uses `devtools`, `subscribeWithSelector`, and `immer`
- **Type Safety**: Full TypeScript support
- **Selectors**: Optimized selectors for performance
- **Actions**: Async actions with proper error handling
- **State Management**: Loading, error, and success states

### React 19 "use" Hook
- Integrates with Zustand store
- Handles suspense and error boundaries
- Provides clean data fetching patterns

### API Simulation
- Simulates real API delays (1.5 seconds)
- Random error simulation (20% error rate)
- Mock user data similar to JSONPlaceholder

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Click "Fetch Users" to load data from the API
2. Watch the loading state with spinner
3. See success state with user cards
4. Experience error handling (20% chance of error)
5. Use "Clear Error" to dismiss errors
6. Use "Reset" to clear all data

## Store Actions

- `fetchUsers()`: Fetch users from API
- `clearError()`: Clear error state
- `reset()`: Reset store to initial state

## Store Selectors

- `useUsers()`: Get users array
- `useLoading()`: Get loading state
- `useError()`: Get error state
- `useHasData()`: Check if data exists
- `useApiActions()`: Get all actions

## Development

- **ESLint**: Code linting
- **TypeScript**: Type checking
- **Vite**: Hot module replacement
- **React DevTools**: Component debugging
- **Zustand DevTools**: State debugging

## Build

```bash
npm run build
```

## License

MIT
