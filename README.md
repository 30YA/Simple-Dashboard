# Simple Dashboard

A modern, responsive dashboard application built with React, Vite, TypeScript, and Tailwind CSS. This project demonstrates a robust architecture for handling authentication, state management, and API integration.

## 🚀 Features

- **Authentication**: Secure Login and Registration flows.
- **Protected Routes**: Dashboard access is restricted to authenticated users.
- **State Management**: centralized state using [Zustand](https://github.com/pmndrs/zustand) with persistence.
- **Data Fetching**: Efficient server state management using [TanStack Query](https://tanstack.com/query/latest).
- **Responsive Design**: Styled with [Tailwind CSS](https://tailwindcss.com/) for a seamless experience across devices.
- **Type Safety**: Built with TypeScript for reliable and maintainable code.
- **Routing**: Client-side routing with [React Router](https://reactrouter.com/).

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **API Client**: [Axios](https://axios-http.com/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)

## 📂 Project Structure

```
src/
├── api/          # API integration (axios instance, hooks, types)
├── components/   # Reusable UI components and ProtectedRoute wrapper
├── pages/        # Application pages (Login, Register, Dashboard)
├── store/        # Global state management (Auth store)
├── App.tsx       # Main application component with routing
└── main.tsx      # Entry point
```

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd Simple-Dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Type-checks and builds the app for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Locally previews the production build.

## 🔌 API

The application connects to a mock API at `https://mock.arianalabs.io/`.
The Axios instance is configured in `src/api/instance.ts` and handles:

- Base URL configuration
- Request interception for attaching the Auth Token
- Response interception for handling 401 Unauthorized errors (auto-logout)
