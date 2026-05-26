import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './assets/styles/index.css';

import Layout from "./layouts/Layout";
import DashLayout from "./layouts/DashLayout";
import ArticlePage from './pages/LandingPage/ArticlePage';
import ArticleListPage from './pages/LandingPage/ArticleListPage';
import HomePage from './pages/LandingPage/HomePage';
import AboutPage from './pages/LandingPage/AboutPage';
import NotFoundPage from "./pages/NotFoundPage";
import SignInPage from "./pages/AuthPages/SignInPage";
import SignUpPage from "./pages/AuthPages/SignUpPage";
import DashboardPage from "./pages/DashboardPages/DashboardPage";
import ReportsPage from "./pages/DashboardPages/ReportsPage";
import UsersPage from "./pages/DashboardPages/UsersPage";

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'articles',
        element: <ArticleListPage />,
      },
      {
        path: 'articles/:name',
        element: <ArticlePage />,
      },
      {
        path: 'signin',
        element: <SignInPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },

      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <DashboardPage />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
