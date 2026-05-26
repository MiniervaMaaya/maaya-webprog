import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './assets/styles/index.css';

import Layout from "./layouts/Layout";
import ArticlePage from './pages/LandingPage/ArticlePage';
import HomePage from './pages/LandingPage/HomePage';
import AboutPage from './pages/LandingPage/AboutPage';
import NotFoundPage from "./pages/NotFoundPage";
import SignInPage from "./pages/AuthPages/SignInPage";
import SignUpPage from "./pages/AuthPages/SignUpPage";

const routes = [
  {
    path: '/',
    element: <Layout />,
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
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
